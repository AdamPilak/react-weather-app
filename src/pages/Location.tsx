import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export function Location() {
    const [queryParams] = useSearchParams()

    useEffect(() => {
        console.log(queryParams)
    }, [])

	return <div></div>
}
