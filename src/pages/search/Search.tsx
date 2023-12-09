import { useEffect, useRef } from "react"
import styles from "./Search.module.css"
import { Weather, getWeather } from "../../api/weather"
import { Form, Link, useLoaderData } from "react-router-dom"

export function Search() {
	const {
		result,
		searchParams: { query },
	} = useLoaderData() as SearchLoaderData

	const queryRef = useRef<HTMLInputElement>(null)
	// const [recentlyViewed, setRecentlyViewed] = useState()

	useEffect(() => {
		if (queryRef.current !== null) queryRef.current.value = query || ""
	}, [query])

	return (
		<div className={styles['search-container']}>
			<Form>
				<input
					type="text"
					name="query"
					ref={queryRef}
				/>
				<button
					type="button"
					className={styles["cancel-btn"]}
					onClick={() => {
						if (queryRef.current !== null) queryRef.current.value = ""
					}}
				>
					Cancel
				</button>
			</Form>
			<SearchList
				header="Results"
				weathers={result}
			></SearchList>
			{/* <SearchList
				header="Recently viewed"
				items={recentlyViewed}
			></SearchList> */}
		</div>
	)
}

type SearchLoaderData = {
	result: Weather[]
	searchParams: { query: string | null }
}

type SearchLoaderParams = {
	request: {
		signal: AbortSignal
		url: string
	}
}

async function loader({ request: { signal, url } }: SearchLoaderParams): Promise<SearchLoaderData> {
	const searchParams = new URL(url).searchParams
	const query = searchParams.get("query") || ""

	const result = [] as Weather[]

	if (query !== "") {
		const response = await getWeather(query, { signal })
		if (typeof response !== "number") result.push(response)
	}

	return {
		result,
		searchParams: { query },
	}
}

export const searchRoute = {
	loader,
	element: <Search />,
}

type SearchListProps = {
	header: string
	weathers: Weather[]
}

export function SearchList({ header, weathers }: SearchListProps) {
	return (
		<>
			<div className={styles["header"]}>{weathers.length > 0 ? header : `No ${header.toLowerCase()}`}</div>
			<ul className={styles["search-list"]}>
				{weathers.map(weather => (
					<SearchItem weather={weather}></SearchItem>
				))}
			</ul>
		</>
	)
}

type SearchItemProps = {
	weather: Weather
}

export function SearchItem({ weather }: SearchItemProps) {
	return (
		<Link to={`/${weather.location.name}`}>
			<div className={styles["search-item"]}>
				<div className={styles.content}>
					<img
						src={weather.current?.condition?.icon}
						alt="current weather image"
						className={styles["weather-img"]}
					/>
					<div className={styles["city-time"]}>
						<h2 className={styles["city-name"]}>{weather.location?.name}</h2>
						<div className={styles.time}>{weather.location?.localtime.split(" ")[1]}</div>
					</div>
				</div>
				<span className={styles.temperature}>{weather.current?.temp_c}°</span>
			</div>
		</Link>
	)
}
