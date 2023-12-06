import { Weather } from '../api/weather'
import { SearchItem } from './SearchItem'
import styles from './SearchList.module.css'

type Props = {
  header: string
  items: Weather[]
}

export function SearchList({ header, items }: Props) {

  return (
    <>
      {items.length > 0 && <div className={styles['header']}>{header}</div>}
      <ul className={styles['search-list']}>
        {items.map((item) => (
          <SearchItem></SearchItem>
        ))}
      </ul>
    </>
  )
}
