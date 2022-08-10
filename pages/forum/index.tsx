import ForumPostCard from "@/components/ForumPostCard"
import NewPostDialog from "@/components/NewPostDialog"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { Button, Chip, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function ForumPage() {
	const [posts, setPosts] = useState([])
	const [postDialogOpen, setPostDialogOpen] = useState(false)

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts")
			const data = await response.json()
			if (data.error) alert(data.error)
			else setPosts(data)
		}
		fetchPosts()
	}, [])

	const createNewPost = (post) => {
		console.log(post)
		setPostDialogOpen(false)
	}

	return (
		<>
			<Stack sx={{ p: 2, gap: 2 }} width="100%" direction="column" alignItems="center">
				<Paper sx={{ width: "100%", maxWidth: "1000px", p: 1 }}>
					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<Stack direction="row" gap={1}>
							{["Most Recent", "Most Liked"].map((cat, index) => (
								<Chip key={index} color={index === 0 ? "secondary" : "default"} clickable label={cat} />
							))}
						</Stack>
						<Button onClick={() => setPostDialogOpen(true)} variant="contained" color="success" sx={{ boxShadow: 0 }}>
							Ask a qestion
						</Button>
					</Stack>
				</Paper>
				<Stack width="100%" direction="column" alignItems="center">
					<Paper sx={{ width: "100%", maxWidth: "1000px" }}>{posts.length > 0 && posts.map((post) => <ForumPostCard key={post.id} data={post} />)}</Paper>
				</Stack>
				<NewPostDialog onSubmit={createNewPost} open={postDialogOpen} onClose={() => setPostDialogOpen(false)} />
			</Stack>
		</>
	)
}

ForumPage.getLayout = withAppBarAndDrwaer
