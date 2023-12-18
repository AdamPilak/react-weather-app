import { useEffect, useState } from "react"
import { Weather, getWeather } from "../api/weather"

export function useRecentlyViewed(key: string, initialValue: string[], limit: number) {
	const [recentlyViewedNames, setRecentlyViewedNames] = useState<string[]>(() => {
		const localStorageValue = localStorage.getItem(key)

		if (localStorageValue == null) return initialValue

		return JSON.parse(localStorageValue)
	})

	function addRecentlyViewed(name: string) {
		const duplicate = recentlyViewedNames.find(n => n === name)

		if (duplicate == null) {
			setRecentlyViewedNames(v => {
				if (recentlyViewedNames.length === limit) {
					v.pop()
				}
				return [name, ...v]
			})
		} else {
			setRecentlyViewedNames(v => {
				const filteredNames = v.filter(n => n !== name)
				return [name, ...filteredNames]
			})
		}
	}

	async function getRecentlyViewed() {
		const recentlyViewed = [] as Weather[]

		await Promise.all(
			recentlyViewedNames.map(name => {
				const signal = new AbortController().signal
				return getWeather(name, signal)
			})
		).then(results => {
			results.forEach(result => {
				if (typeof result !== "number") recentlyViewed.push(result)
			})
		})

		return recentlyViewed
	}

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(recentlyViewedNames))
	}, [key, recentlyViewedNames])

	return { getRecentlyViewed, addRecentlyViewed }
}
