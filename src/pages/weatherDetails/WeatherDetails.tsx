import { Link, Params, redirect, useLoaderData } from "react-router-dom"
import { Weather, getWeather } from "../../api/weather"
import styles from "./WeatherDetails.module.css"

export function WeatherDetails() {
	const { weather } = useLoaderData() as LoaderData
	const DETAILED_INFO = [
		{label: 'UV INDEX', value: weather.current.uv},
		{label: 'WIND', value: weather.current.wind_kph, unit: 'km/h'},
		
	]

	return (
		<div className={styles["container"]}>
			<div className={styles.header}>
				<Link to={`/search?query=${weather.location.name}`} className="fa-solid fa-chevron-left"></Link>
				<h1>Air Conditions</h1>
			</div>

			<div className={styles['main-info']}>
				<div className={styles.header}>
					<h2 className={styles.city}>{weather.location.name}</h2>
					<p className={styles['weather-description']}>{weather.current.condition.text}</p>
				</div>
				<img src={weather.current.condition.icon} alt="" />
				<span className={styles.temperature}>{weather.current.temp_c}°</span>
			</div>

			<ul className="detailed-info">
				{DETAILED_INFO.map(item => (<DetailedInfoItem label={item.label} value={item.value} unit={item.unit}></DetailedInfoItem>))}
			</ul>
		</div>
	)
}

type LoaderParams = {
	request: {
		signal: AbortSignal
	}
	params: Params<string>
}

type LoaderData = {
	weather: Weather
}

async function loader({ request: { signal }, params: { name } }: LoaderParams): Promise<LoaderData | Response> {
	if (name == null) return redirect("/search")

	const response = await getWeather(name, { signal })

	if (typeof response === "number") return redirect(`/search?query=${name}`)

	return { weather: response }
}

export const weatherDetailsRoute = {
	loader,
	element: <WeatherDetails />,
}

type DetailedInfoItemProps = {
	label: string
	value: string | number
	unit?: string
}

function DetailedInfoItem({label, value, unit = ""}: DetailedInfoItemProps) {
	return <li className={styles['detailed-info-item']}>
		<span className={styles.label}>{label}</span>
		<span className={styles.value}>{value} {unit}</span>
	</li>
}
