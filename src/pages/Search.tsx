import { useEffect, useState } from 'react'
import { SearchList } from '../components/SearchList'
import styles from './Search.module.css'
import { getWeather } from '../api/weather'

export function Search() {
  const [results, setResults] = useState([''])
  const [recentlyViewed, setRecentlyViewed] = useState(['', ''])

  useEffect(() => {
	setResults(getWeather('london'))
  }, [])

  return (
    <div className={styles['search-container']}>
      <div className={styles['search']}>
        <input type="text" />
        <button>Cancel</button>
      </div>
      <SearchList header="Results" items={results}></SearchList>
      <SearchList header="Recently viewed" items={recentlyViewed}></SearchList>
    </div>
  )
}
