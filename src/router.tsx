import { createBrowserRouter } from "react-router-dom"
import { Search } from "./pages/Search"
import { Location } from "./pages/Location"
import { RootLayout } from "./layouts/RootLayout"
import { Home } from "./pages/Home"

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
