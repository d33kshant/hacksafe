import {
	Paper,
	Stack,
	Typography,
	Divider,
	CircularProgress,
} from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"

export default function VideoCardHomePage() {
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

	const getContent = () => {
		if (loading) {
			return (
				<>
					<CircularProgress />
					<Typography>Loading...</Typography>
				</>
			)
		}

		return
	}

	return (
		<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
			<Stack py={1} px={2} direction="row">
				<Typography flex={1} color="gray" variant="button">
					Latest Videos
				</Typography>
				<Typography
					component="a"
					href="/videos"
					color="royalblue"
					variant="button"
				>
					View More
				</Typography>
			</Stack>
			<Divider />
			<Stack direction="row" p={2} gap={2}>
				{loading ? (
					<Stack alignItems="cente">
						<CircularProgress />
						<Typography>Loading...</Typography>
					</Stack>
				) : (
					<>
						{videos.map((video) => (
							<VideoCard key={video.id} data={video} />
						))}
					</>
				)}
			</Stack>
		</Paper>
	)
}

function VideoCard({ data: { id, title, thumbnail, views, updatedAt } }) {
	return (
		<Stack
			width="250px"
			component="a"
			href={`/videos/${id}`}
			direction="column"
		>
			<img
				style={{
					width: "100%",
					maxWidth: "250px",
					objectFit: "cover",
					marginBottom: 4,
					borderRadius: 4,
				}}
				src={thumbnail}
			/>
			<Typography variant="body1">{title}</Typography>
			<Typography color="gray" variant="body2">
				{views} Views • {moment(updatedAt).fromNow()}
			</Typography>
		</Stack>
	)
}
