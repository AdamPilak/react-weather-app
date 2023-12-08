import { createBrowserRouter } from "react-router-dom"
import { searchRoute } from "./pages/search/Search"
import { weatherDetailsRoute } from "./pages/weatherDetails/WeatherDetails"
import { RootLayout } from "./layouts/RootLayout"
import { Home } from "./pages/home/Home"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "search", ...searchRoute },
			{ path: ":name", ...weatherDetailsRoute },
		],
	},
])
