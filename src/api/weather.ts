import { AxiosError } from "axios"
import { baseApi } from "./base"

export type Weather = {
	location: Location
	current: Current
}

export type Current = {
	last_updated_epoch: number
	last_updated: string
	temp_c: number
	temp_f: number
	is_day: number
	condition: Condition
	wind_mph: number
	wind_kph: number
	wind_degree: number
	wind_dir: string
	pressure_mb: number
	pressure_in: number
	precip_mm: number
	precip_in: number
	humidity: number
	cloud: number
	feelslike_c: number
	feelslike_f: number
	vis_km: number
	vis_miles: number
	uv: number
	gust_mph: number
	gust_kph: number
}

export type Condition = {
	text: string
	icon: string
	code: number
}

export type Location = {
	name: string
	region: string
	country: string
	lat: number
	lon: number
	tz_id: string
	localtime_epoch: number
	localtime: string
}

export function getWeather(query: string, signal: AbortSignal): Promise<Weather | number> {
	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "X-Requested-With",
	}

	return baseApi
		.get<Weather>(`/current.json?key=a0c075ba8c1d4078baf165547230512&q=${query}`, { headers, signal })
		.then(res => res.data)
		.catch((err: AxiosError) => {
			// console.clear()
			if (err.request.status === 400) return err.request.status
		})
}
