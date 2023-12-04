import { Outlet } from "react-router-dom";

export function Search() {
	return (
		<>
			<div style={{fontSize: '40px', display: 'flex', alignItems: 'center'}}>Search</div>
            <Outlet></Outlet>
		</>
	)
}
