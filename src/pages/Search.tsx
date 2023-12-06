import { SearchItem } from "../components/Searchitem";

export function Search() {
	return (
		<div className="search-container">
			<div className="search">
				<input type="text" />
				<button>Cancel</button>
			</div>
			<ul className="search-list">
				<SearchItem></SearchItem>
			</ul>
		</div>
	)
}
