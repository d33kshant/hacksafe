import BlogCard from "@/components/BlogCard"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { Button, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material"
import useSWR from "swr"

export default function BlogsPage() {
	const { data, error, isValidating } = useSWR("/api/blogs", fetcher)

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
						<Button variant="contained" color="success" sx={{ boxShadow: 0 }}>
							Write a blog
						</Button>
					</Stack>
				</Paper>
				<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
					<Stack alignItems="center">{getContent(error, data)}</Stack>
				</Paper>
			</Stack>
		</>
	)
}

function getContent(error: any, data: any) {
	console.log(error, data)
	if (error || data?.error) {
		return <Typography>Failed to get data</Typography>
	}
	if (data && Array.isArray(data)) {
		return data.map((blog) => <BlogCard key={blog.id} data={blog} />)
	}
	return (
		<Stack p={2}>
			<CircularProgress size={36} />
		</Stack>
	)
}

BlogsPage.getLayout = withAppBarAndDrwaer
