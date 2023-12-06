import styles from './SearchItem.module.css'
import sun from '../assets/images/sun.png'

export function SearchItem() {
  return (
    <div className={styles['search-item']}>
      <div className={styles['content']}>
        <img src={sun} alt="" className={styles['weather-img']} />
        <div className={styles['city-time']}>
            <h2 className={styles['city-name']}>Barcelona</h2>
            <div className={styles['time']}>11:32</div>
        </div>
      </div>
      <span className={styles['temperature']}>29°C</span>
    </div>
  )
}
