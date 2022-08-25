import {
	Paper,
	Stack,
	Typography,
	Divider,
	CircularProgress,
} from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"

export default function BlogsCardHomePage() {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/api/blogs')
            const data = await response.json()
            if (data.error) return alert(data.error)
            setBlogs(data)
            setLoading(false)
        }
        fetchBlogs()
    })

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
						{blogs.map((blog) => (
							<BlogCard key={blog.id} data={blog} />
						))}
					</>
				)}
			</Stack>
		</Paper>
	)
}