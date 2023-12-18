import { ReactNode, createContext, useContext } from 'react'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { Weather } from '../api/weather'
type RecentlyViewedContext = {
  getRecentlyViewed: () => Promise<Weather[]>
  addRecentlyViewed: (name: string) => void
}

export const Context = createContext<RecentlyViewedContext | null>(null)

type RecentlyViewedProviderProps = {
    children: ReactNode
}

export function RecentlyViewedProvider({ children }: RecentlyViewedProviderProps) {
  const {getRecentlyViewed, addRecentlyViewed} = useRecentlyViewed(
    'RECENTLY_VIEWED',
    []
  )

  return (
    <>
      <Context.Provider value={{ getRecentlyViewed, addRecentlyViewed }}>
        {children}
      </Context.Provider>
    </>
  )
}

export function useRecentlyViewedContext() {
    const value = useContext(Context)
    if (value == null) {
        throw new Error('Must use within Context.Provider')
    }

    return value
}
