import styles from "./SearchItem.module.css"
import { Weather } from "../../api/weather"
import { Link } from "react-router-dom"

type Props = {
	weather: Weather
}

export function SearchItem({ weather }: Props) {
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
				<span className={styles.temperature}>{weather.current?.temp_c}°C</span>
			</div>
		</Link>
	)
}
