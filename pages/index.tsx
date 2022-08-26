import HomeNavigationCard from "@/components/HomeNavCard"
import HomePageBlogsCard from "@/components/HomePageBlogsCard"
import VideoCardHomePage from "@/components/VideoCardHomePage"
import { LibraryBooks, Queue, Quiz, VideoLibrary } from "@mui/icons-material"
import {
	Avatar,
	Button,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material"

export default function Home() {
	return (
		<Stack width="100%">
			<Stack
				justifyContent="center"
				alignItems="center"
				height="450px"
				width="100%"
				p={1}
				sx={{ background: "mediumseagreen" }}
			>
				<Typography color="white" variant="h3">
					HackSafe
				</Typography>
				<Typography
					my={2}
					variant="h5"
					maxWidth="720px"
					textAlign="center"
				>
					An education and reward platform where you can learn
					cyberhygiene and earn free rewards.
				</Typography>
				<Button
					onClick={() => {
						window.location.href = "/videos"
					}}
					variant="contained"
					color="inherit"
				>
					Continue Learning
				</Button>
			</Stack>
			<Stack alignItems="center" p={2} gap={2}>
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
							description="Read blogs and article about cyber hyigene or write you own blogs and earn reward with that"
						/>
						<HomeNavigationCard
							title="Play Quizzes"
							icon={
								<Avatar>
									<Quiz></Quiz>
								</Avatar>
							}
							href="/quizzes"
							description="Test your knowledge on cyber hygiene and earn points for correct answers."
						/>
						<HomeNavigationCard
							title="Ask Questions"
							icon={
								<Avatar>
									<Queue></Queue>
								</Avatar>
							}
							href="/forum"
							description="If you have any dought you can ask it here or you can answer other's questions"
						/>
					</Grid>
				</Paper>
				<VideoCardHomePage />
				<HomePageBlogsCard />
			</Stack>
		</Stack>
	)
}
