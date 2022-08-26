import {
	ForumRounded,
	Help,
	LibraryBooks,
	LocalOffer,
	Quiz,
	VideoLibrary,
} from "@mui/icons-material"
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Typography,
} from "@mui/material"
import { useRouter } from "next/router"

export default function ({ variant, open, onClose }) {
	return (
		<Drawer
			sx={{ width: 240 }}
			onClose={onClose}
			open={open}
			anchor="left"
			variant={variant}
		>
			<Box sx={{ height: "48px" }}></Box>
			<Box sx={{ width: 240 }} role="presentation">
				<List>
					<ListSubheader>
						<Typography
							color="darkgrey"
							textTransform="uppercase"
							my={1}
							fontWeight="500"
						>
							Learn
						</Typography>
					</ListSubheader>
					<SideBarOption
						href="/videos"
						lable="Watch Videos"
						icon={<VideoLibrary />}
					/>
					<SideBarOption
						href="/blogs"
						lable="Read Blogs"
						icon={<LibraryBooks />}
					/>
					<SideBarOption
						href="/quizzes"
						lable="Play Quizzes"
						icon={<Quiz />}
					/>
				</List>
				<Divider />
				<List>
					<ListSubheader>
						<Typography
							color="darkgrey"
							textTransform="uppercase"
							my={1}
							fontWeight="500"
						>
							Earn
						</Typography>
					</ListSubheader>
					<SideBarOption
						href="/offers"
						lable="Explore Offers"
						icon={<LocalOffer />}
					/>
				</List>
				<Divider />
				<List>
					<ListSubheader>
						<Typography
							color="darkgrey"
							textTransform="uppercase"
							my={1}
							fontWeight="500"
						>
							Discuss
						</Typography>
					</ListSubheader>
					<SideBarOption
						href="/forum"
						lable="Forum"
						icon={<ForumRounded />}
					/>
					<SideBarOption href="/help" lable="Help" icon={<Help />} />
				</List>
			</Box>
		</Drawer>
	)
}

function SideBarOption({ lable, icon, href }) {
	const router = useRouter()
	return (
		<ListItem alignItems="flex-start" disablePadding>
			<ListItemButton
				selected={router.pathname.startsWith(href)}
				component="a"
				href={href}
			>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={lable} />
			</ListItemButton>
		</ListItem>
	)
}
