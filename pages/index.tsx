import BlogsCardHomePage from "@/components/BlogsCardHomePage"
import HomeNavigationCard from "@/components/HomeNavCard"
import VideoCardHomePage from "@/components/VideoCardHomePage"
import { LibraryBooks, Queue, Quiz, VideoLibrary } from "@mui/icons-material"
import { Avatar, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { useSession } from "next-auth/react"

export default function Home() {
	
	const { data } = useSession()

	return (
		<Stack width="100%">
			<Stack
				justifyContent="center"
				alignItems="center"
				height="500px"
				width="100%"
				p={1}
				sx={{ background: "mediumseagreen" }}
			>
				<Typography color="white" variant="h3">
					HackSafe
				</Typography>
				<Typography
					mt={2}
					variant="h5"
					maxWidth="800px"
					textAlign="center"
				>
					An education and reward platform where you can learn
					cyberhygiene to earn free rewards.
				</Typography>
				<Button onClick={()=>{}} sx={{ mt: 2 }} variant="contained" color="inherit">{data.user ? "Start Learning" : "Get Started"}</Button>
			</Stack>
			<Stack
				alignItems="center"
				p={1}
				gap={2}
			>
				<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
					<Grid container>
						<HomeNavigationCard
							title="Watch Video"
							icon={
								<Avatar>
									<VideoLibrary></VideoLibrary>
								</Avatar>
							}
							href="/videos"
							description="Learn the best practices of cyber hygiene through video tutorial and courses and earn reward with that"
						/>
						<HomeNavigationCard
							title="Read Blogs"
							icon={
								<Avatar>
									<LibraryBooks></LibraryBooks>
								</Avatar>
							}
							href="/blogs"
							description="Learn the best practices of cyber hygiene through video tutorial and courses and earn reward with that"
						/>
						<HomeNavigationCard
							title="Play Quizzes"
							icon={
								<Avatar>
									<Quiz></Quiz>
								</Avatar>
							}
							href="/quizzes"
							description="Learn the best practices of cyber hygiene through video tutorial and courses and earn reward with that"
						/>
						<HomeNavigationCard
							title="Ask Questions"
							icon={
								<Avatar>
									<Queue></Queue>
								</Avatar>
							}
							href="/forum"
							description="Learn the best practices of cyber hygiene through video tutorial and courses and earn reward with that"
						/>
					</Grid>
				</Paper>
				<VideoCardHomePage />
				<BlogsCardHomePage />
			</Stack>
		</Stack>
	)
}
