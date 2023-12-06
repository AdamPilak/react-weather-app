import { baseApi } from "./base"

export function getWeather(query: string) {
	return baseApi.get(`/current.json?key=a0c075ba8c1d4078baf165547230512&q=${query}`).then(res => console.log(res.data))
}
