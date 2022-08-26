import NewPostDialog from "@/components/NewPostDialog"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { Replay, Reply, ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material"
import {
	Avatar,
	Button,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import moment from "moment"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"

const likePost = async (id) => {
	const response = await fetch("/api/like?post=" + id, {
		method: "POST",
		headers: {
			Accepts: "application/json",
		},
	})
	const data = await response.json()
	return data
}

const postReply = async (reply) => {
	const response = await fetch("/api/post", {
		method: "POST",
		headers: {
			Accepts: "application/json",
			"Content-type": "application/json",
		},
		body: JSON.stringify(reply),
	})
	const data = await response.json()
	if (data.error) return alert(data.error)
	alert("Replied successfully")
}

export default function ForumQuestionPage() {
	const router = useRouter()
	const { id } = router.query

	const { data, error } = useSWR("/api/posts?id=" + id, fetcher)

	const onLike = async () => {
		const result = await likePost(id)
	}

	return (
		<>
			<Head>
				<title>
					{data ? data.title + "• HackSafe" : "Forum • HackSafe"}
				</title>
			</Head>
			<Stack
				sx={{ p: 2, gap: 2 }}
				width="100%"
				direction="column"
				alignItems="center"
			>
				<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
					{data && (
						<>
							<Stack
								pt={2}
								pb={1}
								px={2}
								direction="row"
								gap={1}
								alignItems="center"
								mb={1}
							>
								<Avatar
									sx={{ width: 24, height: 24 }}
									alt={data?.user?.name}
									src={data?.user?.image}
								/>
								<Typography>{data?.user?.name}</Typography>
								<Typography
									ml="auto"
									color="gray"
									fontSize={14}
								>
									{moment(data.createdAt).fromNow()}
								</Typography>
							</Stack>
							<Divider />
							<Stack p={2} gap={1}>
								<Typography fontWeight={500} variant="h5">
									{data.title}
								</Typography>
								<Typography>{data.body}</Typography>
							</Stack>
							<Divider />
							<Stack
								direction="row"
								gap={1}
								alignItems="center"
								p={1}
								pr={2}
							>
								<IconButton
									onClick={onLike}
									color={data.liked ? "primary" : "default"}
								>
									{data.liked ? (
										<ThumbUpAlt />
									) : (
										<ThumbUpOffAlt />
									)}
								</IconButton>{" "}
								{data.likes} Likes
								<IconButton>
									<Replay />
								</IconButton>{" "}
								{data.answers.length} Replies
							</Stack>
						</>
					)}
				</Paper>
				<Typography
					variant="h5"
					sx={{ width: "100%", maxWidth: "1000px", py: 1 }}
				>
					Answers
				</Typography>
				<Stack gap={2} sx={{ width: "100%", maxWidth: "1000px" }}>
					{data?.answers?.length > 0
						? data.answers.map((ans, index) => (
								<PostAnswer
									indent={false}
									key={index}
									id={ans}
								/>
						  ))
						: "No Answers"}
				</Stack>
			</Stack>
		</>
	)
}

function SinglePost({ data, onLike }) {
	const [replyDialogOpen, setReplyDialogOpen] = useState(false)
	return (
		<>
			<Stack
				pt={2}
				pb={1}
				px={2}
				direction="row"
				gap={1}
				alignItems="center"
				mb={1}
			>
				<Avatar
					sx={{ width: 24, height: 24 }}
					alt={data?.user?.name}
					src={data?.user?.image}
				/>
				<Typography>{data?.user?.name}</Typography>
				<Typography ml="auto" color="gray" fontSize={14}>
					{moment(data.createdAt).fromNow()}
				</Typography>
			</Stack>
			<Divider />
			<Stack p={2}>
				<Typography variant="h6">{data.title}</Typography>
				<Typography>{data.body}</Typography>
			</Stack>
			<Divider />
			<Stack direction="row" gap={1} alignItems="center" p={1}>
				<IconButton
					onClick={onLike}
					color={data.liked ? "primary" : "default"}
				>
					{data.liked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
				</IconButton>{" "}
				{data.likes} Likes
				<IconButton onClick={() => setReplyDialogOpen(true)}>
					<Replay />
				</IconButton>{" "}
				{data.answers.length} Replies
			</Stack>
			<NewPostDialog
				reference={data.id}
				open={replyDialogOpen}
				onClose={() => {
					setReplyDialogOpen(false)
				}}
				onSubmit={(reply) => postReply(reply)}
			/>
		</>
	)
}

function PostAnswer({ id, indent }) {
	const { data } = useSWR("/api/posts?id=" + id, fetcher)
	const [liked, setLiked] = useState(false)

	const onLike = async () => {
		const result = await likePost(id)
	}

	return (
		<>
			<Paper
				sx={{
					width: indent ? "95%" : "100%",
					maxWidth: "1000px",
					ml: "auto",
				}}
			>
				{data && <SinglePost onLike={onLike} data={data} />}
			</Paper>
			{data?.answers &&
				data.answers.map((ans, index) => (
					<PostAnswer indent={true} key={index} id={ans} />
				))}
		</>
	)
}

ForumQuestionPage.getLayout = withAppBarAndDrwaer
