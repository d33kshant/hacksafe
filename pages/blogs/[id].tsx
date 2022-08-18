import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import {
	CircularProgress,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import { marked } from "marked"
import DOMPurify from "isomorphic-dompurify"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function BlogPage() {
	const router = useRouter()
	const { id } = router.query

	const [blog, setBlog] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBlog = async () => {
			if (id) {
				const response = await fetch("/api/blogs?id=" + id)
				const data = await response.json()
				console.log(id)
				if (data.error) return alert(data.error)
				setBlog(data)
				setLoading(false)
			}
		}
		fetchBlog()
	}, [id])

	return (
		<>
			<Stack
				sx={{ p: 2, gap: 2 }}
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
					{!loading && blog?.title && (
						<>
							<Stack p={2}>
								<img
									style={{
										width: "100%",
										height: 250,
										objectFit: "cover",
										borderRadius: 8,
									}}
									src={blog.banner}
								/>
								<Typography mt={2} variant="h4">
									{blog.title}
								</Typography>
							</Stack>
							<Divider />
							<Stack p={2}>
								<div
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											marked.parse(
												blog.body ||
													"Failed to render this blog"
											)
										),
									}}
								></div>
							</Stack>
						</>
					)}
				</Paper>
			</Stack>
		</>
	)
}

BlogPage.getLayout = withAppBarAndDrwaer
