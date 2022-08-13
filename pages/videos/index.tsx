import VideoCard from "@/components/VideoCard"
import VideoSkeleton from "@/components/VideoSkeleton"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"

export default function VideosPage() {
	const [videos, setVideos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchVideos = async () => {
			const response = await fetch("/api/videos")
			const range = response.headers.get("Content-range")
			// if (range) {
			const videos = await response.json()
			setVideos(videos)
			setLoading(false)
			// }
		}
		fetchVideos()
	}, [])

	return (
		<Stack width="100%" alignItems="center" p={2}>
			<Grid sx={{ width: "100%", maxWidth: "1400px" }} flex={1} container spacing={{ xs: 1, sm: 2 }}>
				{loading &&
					Array(4)
						.fill(0)
						.map((_, i) => <VideoSkeleton key={i} />)}
				{videos.length > 0 && videos.map((video) => <VideoCard key={video.id} data={video} />)}
			</Grid>
		</Stack>
	)
}

VideosPage.getLayout = withAppBarAndDrwaer
