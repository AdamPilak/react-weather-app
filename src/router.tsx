import { createBrowserRouter } from "react-router-dom"
import { Search } from "./components/Search"
import { Location } from "./components/Location"
import { RootLayout } from "./layouts/RootLayout"
import { Home } from "./components/Home"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
            { index: true, element: <Home /> },
            { path: "search", element: <Search /> },
            { path: ":name", element: <Location /> }
        ],
	},
])
