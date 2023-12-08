import { Weather } from "../../api/weather"
import { SearchItem } from "../searchItem/SearchItem"
import styles from "./SearchList.module.css"

type Props = {
	header: string
	weathers: Weather[]
}

export function SearchList({ header, weathers }: Props) {
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
