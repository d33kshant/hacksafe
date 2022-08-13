import VideoPlayer from "@/components/VideoPlayer"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { ThumbUpAlt } from "@mui/icons-material"
import { Chip, CircularProgress, Divider, IconButton, Paper, Stack, Typography } from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function VideoPage() {
	const router = useRouter()
	const { id } = router.query

	const [video, setVideo] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchvideo = async () => {
			const response = await fetch("/api/videos?id=" + id)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setVideo(data)
			setLoading(false)
		}
		if (id) fetchvideo()
		return () => {
			setVideo(null)
			setLoading(true)
		}
	}, [id])

	return (
		<Stack p={{ sm: 1, md: 2 }} sx={{ gap: 2 }} width="100%" direction="column" alignItems="center">
			<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
				{loading && (
					<Stack alignItems="center" pt={2}>
						<CircularProgress size={36} />
						<Typography my={1}>Loading...</Typography>
					</Stack>
				)}
				{!loading && video && (
					<>
						<Stack>
							<Stack p={{ sm: 0, md: 2 }}>
								<VideoPlayer src={video.url} />
							</Stack>
							<Stack gap={2} p={2}>
								<Typography flex={1} variant="h5">
									{video.title}
								</Typography>
								<Stack alignItems="center" gap={2} direction="row">
									<IconButton>
										<ThumbUpAlt />
									</IconButton>
									<Typography>{video.likes} Likes</Typography>
									<Typography>{video.views} Views</Typography>
									<Typography ml="auto">{moment(video.createdAt).fromNow()}</Typography>
								</Stack>
							</Stack>
							<Divider />
							<Stack p={2} pb={0} gap={1} direction="row">
								{video.tags.map((tag, index) => (
									<Chip key={index} clickable label={tag} />
								))}
							</Stack>
							<Stack p={2}>
								<Typography color="gray">{video.description}</Typography>
							</Stack>
						</Stack>
					</>
				)}
			</Paper>
		</Stack>
	)
}

VideoPage.getLayout = withAppBarAndDrwaer
