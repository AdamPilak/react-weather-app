import { Outlet } from "react-router-dom"
import styles from "./RootLayout.module.css"

export function RootLayout() {
    console.log(styles)
	return (
		<>
			<div className={styles['full-size-container']}>
				<div className={styles['restricted-size-container']}>
					<Outlet></Outlet>
				</div>
			</div>
		</>
	)
}
