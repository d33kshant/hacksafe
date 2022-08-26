import ReportDialog from "@/components/ReportDialog"
import VideoPlayer from "@/components/VideoPlayer"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { FlagCircle, ThumbUpAlt } from "@mui/icons-material"
import {
	Chip,
	CircularProgress,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import moment from "moment"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function VideoPage() {
	const router = useRouter()
	const { id } = router.query
	const { data } = useSession()

	const [video, setVideo] = useState(null)
	const [loading, setLoading] = useState(true)
	const [liked, setLiked] = useState(false)

	const [reportDialogOpen, setReportDialogOpen] = useState(false)

	useEffect(() => {
		const fetchvideo = async () => {
			const response = await fetch("/api/videos?id=" + id)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setVideo(data)
			setLoading(false)
			setLiked(data?.liked)
		}
		if (id) fetchvideo()
		return () => {
			setVideo(null)
			setLoading(true)
		}
	}, [id])

	const likeVideo = async (id) => {
		const response = await fetch("/api/like?video=" + id, {
			method: "POST",
			headers: {
				Accepts: "application/json",
			},
		})
		const data = await response.json()
		setLiked(data.liked)
	}

	return (
		<Stack
			p={{ sm: 1, md: 2 }}
			sx={{ gap: 2 }}
			width="100%"
			direction="column"
			alignItems="center"
		>
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
								<VideoPlayer id={id} src={video.url} />
							</Stack>
							<Stack gap={2} p={2}>
								<Stack alignItems="center" direction="row">
									<Typography flex={1} variant="h5">
										{video.title}
									</Typography>
									<IconButton
										size="large"
										title="Report this video"
										onClick={() =>
											setReportDialogOpen(true)
										}
									>
										<FlagCircle fontSize="inherit" />
									</IconButton>
								</Stack>
								<Stack
									alignItems="center"
									gap={2}
									direction="row"
								>
									<IconButton onClick={() => likeVideo(id)}>
										<ThumbUpAlt
											color={
												liked ? "primary" : "inherit"
											}
										/>
									</IconButton>
									<Typography>{video.likes} Likes</Typography>
									<Typography>{video.views} Views</Typography>
									{video.status && (
										<Chip
											color={
												video.status === "Published"
													? "success"
													: video.status === "Pending"
													? "warning"
													: "error"
											}
											label={video.status}
										/>
									)}
									<Typography ml="auto">
										{moment(video.createdAt).fromNow()}
									</Typography>
								</Stack>
							</Stack>
							<Divider />
							<Stack p={2} pb={0} gap={1} direction="row">
								{video.tags.map((tag, index) => (
									<Chip key={index} clickable label={tag} />
								))}
							</Stack>
							<Stack p={2}>
								<Typography color="gray">
									{video.description}
								</Typography>
							</Stack>
						</Stack>
					</>
				)}
			</Paper>
			<ReportDialog
				contentId={id}
				contentType="video"
				open={reportDialogOpen}
				onClose={() => setReportDialogOpen(false)}
			/>
		</Stack>
	)
}

VideoPage.getLayout = withAppBarAndDrwaer
