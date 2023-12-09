import { Link, Params, redirect, useLoaderData } from 'react-router-dom'
import { Weather, getWeather } from '../../api/weather'
import styles from './WeatherDetails.module.css'

type DetailedInfoItem = {
  label: string
  value: string | number
  unit?: string
}

export function WeatherDetails() {
  const { weather } = useLoaderData() as LoaderData
  const DETAILED_INFO: DetailedInfoItem[] = [
    { label: 'FEELS LIKE', value: weather.current.feelslike_c, unit: '°C' },
    { label: 'TIME', value: weather.location.localtime.split(' ')[1] },
    { label: 'WIND SPEED', value: weather.current.wind_kph, unit: 'km/h' },
    { label: 'WIND DIRECTION', value: weather.current.wind_dir },
    { label: 'HUMIDITY', value: weather.current.humidity, unit: '%' },
    { label: 'VISIBILITY', value: weather.current.vis_km, unit: 'km' },
    { label: 'CLOUDS', value: weather.current.cloud, unit: '%' },
    { label: 'UV INDEX', value: weather.current.uv },
    { label: 'PRECIPITATION', value: weather.current.precip_mm, unit: 'mm' },
    { label: 'PRESSURE', value: weather.current.pressure_mb, unit: 'hPa' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link
          to={`/search?query=${weather.location.name}`}
          className="fa-solid fa-chevron-left"
        ></Link>
        <h1>Air Conditions</h1>
      </div>

      <div className={styles['main-info']}>
        <div className={styles.header}>
          <h2 className={styles.city}>{weather.location.name}</h2>
          <p className={styles['weather-description']}>
            {weather.current.condition.text}
          </p>
        </div>
        <img src={weather.current.condition.icon} alt="" />
        <span className={styles.temperature}>{weather.current.temp_c}°C</span>
      </div>

      <ul className={styles['detailed-info']}>
        {DETAILED_INFO.map((item) => (
          <li className={styles['detailed-info-item']}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>
              {item.value} {item.unit}
            </span>
          </li>
        ))}
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

async function loader({
  request: { signal },
  params: { name },
}: LoaderParams): Promise<LoaderData | Response> {
  if (name == null) return redirect('/search')

  const response = await getWeather(name, { signal })

  if (typeof response === 'number') return redirect(`/search?query=${name}`)

  return { weather: response }
}

export const weatherDetailsRoute = {
  loader,
  element: <WeatherDetails />,
}
