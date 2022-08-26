import { useEffect, useRef } from "react"

export default function VideoPlayer({ id, src, ...props }) {
	const videoRef = useRef(null)

	useEffect(() => {
		const requestReward = async () => {
			const response = await fetch("/api/points/reward", {
				method: "POST",
				headers: {
					Accepts: "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					id,
					type: "video",
				}),
			})
			const data = await response.json()
			if (data.error) return alert(data.error)
			alert(data.message)
		}
		const callbackFunction = () => requestReward()
		videoRef.current.addEventListener("ended", callbackFunction)
		return () => {
			videoRef.current.removeEventListener("ended", callbackFunction)
		}
	}, [])

	return (
		<video ref={videoRef} controls controlsList="nodownload" {...props}>
			<source src={src} />
		</video>
	)
}
