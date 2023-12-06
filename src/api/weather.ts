import { baseApi } from './base'

export type Weather = {
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

type Condition = {
  text: string
  icon: string
  code: number
}

export function getWeather(query: string) {
  return baseApi
    .get(`/current.json?key=a0c075ba8c1d4078baf165547230512&q=${query}`)
    .then((res) => res.data.current as Weather)
}
