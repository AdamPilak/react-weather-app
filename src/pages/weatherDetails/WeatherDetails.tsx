import { Params, redirect, useLoaderData } from "react-router-dom"
import { Weather, getWeather } from "../../api/weather"
import styles from "./WeatherDetails.module.css"

export function WeatherDetails() {
	const { weather } = useLoaderData() as LoaderData

	return (
		<div className={styles["weather-details"]}>
			<div className={styles.header}>
				<i className="fa-solid fa-chevron-left"></i>
				<h1>Air Conditions - {weather.location.name}</h1>
			</div>
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
