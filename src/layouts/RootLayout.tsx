import { Outlet } from "react-router-dom"
import styles from "./RootLayout.module.css"
import { RecentlyViewedProvider } from "../context/RecentlyViewedContext"

export function RootLayout() {
	return (
		<>
			<div className={styles['full-size-container']}>
				<div className={styles['restricted-size-container']}>
					<RecentlyViewedProvider>
					<Outlet></Outlet>
					</RecentlyViewedProvider>
				</div>
			</div>
		</>
	)
}
