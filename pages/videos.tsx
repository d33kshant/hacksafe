import VideoCard from "@/components/VideoCard"
import VideoSkeleton from "@/components/VideoSkeleton"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"

export default function VideosPage() {

	const [videos, setVideos] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchVideos = async () => {
			const response = await fetch('/api/videos')
			const range = response.headers.get('Content-range')
			// if (range) {
				const videos = await response.json()
				setVideos(videos)
				setLoading(false)
			// }
		}
		fetchVideos()
	}, [])

	return (
		<Grid flex={1} container p={2} spacing={{ xs: 1, sm: 2 }}>
			{ loading && <VideoSkeleton />}
			{ videos.length > 0 && videos.map(video=><VideoCard key={video.id} data={video} />) }
		</Grid>
	) 
}

VideosPage.getLayout = withAppBarAndDrwaer
