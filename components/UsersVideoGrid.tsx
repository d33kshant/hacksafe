import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
import VideoSkeleton from "./VideoSkeleton"

export default function UsersVideoGrid({ user }) {
	const [videos, setVideos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUserPosts = async () => {
			const response = await fetch(`/api/videos?author=${user}`)
			const data = await response.json()
			setLoading(false)
			if (data.error) return alert(data.error)
			setVideos(data)
		}
		fetchUserPosts()
	}, [])

	return (
		<Grid
			sx={{ width: "100%", maxWidth: "1400px", p: 2 }}
			flex={1}
			container
			spacing={{ xs: 1, sm: 2 }}
		>
			{loading &&
				Array(4)
					.fill(0)
					.map((_, i) => <VideoSkeleton key={i} />)}
			{videos.length > 0 &&
				videos.map((video) => (
					<VideoCard key={video.id} data={video} />
				))}
		</Grid>
	)
}
