import {
	CircularProgress,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"

export default function HomePageBlogsCard() {
	const [loading, setLoading] = useState(false)
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchBlogs = async () => {
			const response = await fetch("/api/blogs")
			const data = await response.json()
			if (data.error) return alert(data.error)
			setLoading(false)
			setBlogs(data)
		}
		fetchBlogs()
	}, [])

	return (
		<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
			<Stack py={1} px={2} direction="row">
				<Typography flex={1} color="gray" variant="button">
					Latest Blogs
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
			<Stack gap={2}>
				{loading ? (
					<Stack alignItems="cente">
						<CircularProgress />
						<Typography>Loading...</Typography>
					</Stack>
				) : (
					<>
						{blogs.map((video) => (
							<BlogCard key={video.id} data={video} />
						))}
					</>
				)}
			</Stack>
		</Paper>
	)
}
