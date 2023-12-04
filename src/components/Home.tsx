import styles from "./Home.module.css"
import umbrella from "../assets/images/umbrella.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Home() {
	const [animation, setAnimation] = useState("fade-in")
	const [isAnimating, setIsAnimating] = useState(true)
	const [isAfterFirstAnimation, setIsAfterFirstAnimation] = useState(false)
	const navigate = useNavigate()

	function handleAnimationEnd() {
		setIsAnimating(false)
		if (isAfterFirstAnimation) navigate("/search")
		else {
			setIsAfterFirstAnimation(true)
			setAnimation("fade-out")
		}
	}

	return (
		<div
			onAnimationEnd={handleAnimationEnd}
			className={`${styles["home-container"]} ${isAnimating ? styles[`${animation}`] : ""}`}
		>
			<img
				src={umbrella}
				alt="blue umbrella"
			/>
			<div className={styles["home-text"]}>
				<h1>Breeze</h1>
				<h2>Weather App</h2>
			</div>
			<button
				className={styles["home-btn"]}
				onClick={() => setIsAnimating(true)}
			>
				<i className="fa-solid fa-arrow-right"></i>
			</button>
		</div>
	)
}
