import { useEffect, useRef } from "react"
import { SearchList } from "../../components/searchList/SearchList"
import styles from "./Search.module.css"
import { Weather, getWeather } from "../../api/weather"
import { Form, useLoaderData } from "react-router-dom"

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
		<div className={styles.search}>
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
