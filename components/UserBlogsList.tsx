import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"

export default function UserBlogsList({ user }) {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchBlogs = async () => {
			const response = await fetch("/api/blogs?author=" + user)
			const data = await response.json()
			if (data.error) return alert(data.error)
			setBlogs(data)
		}
		fetchBlogs()
	}, [])

	return (
		<Stack>
			{blogs.map((blog, index) => (
				<BlogCard key={index} data={blog} />
			))}
		</Stack>
	)
}
