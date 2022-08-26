import PointsChip from "@/components/PointsChip"
import UserBlogsList from "@/components/UserBlogsList"
import UsersVideoGrid from "@/components/UsersVideoGrid"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import {
	Avatar,
	CircularProgress,
	Divider,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material"
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UserPage() {
	const { data, status } = useSession()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [currentTab, setCurrentTab] = useState(0)

	useEffect(() => {
		const fetchUserinfo = async () => {
			const response = await fetch("/api/user?email=" + data?.user?.email)
			const json = await response.json()
			if (json.error) return alert(json.error)
			setUser(json)
			setLoading(false)
		}
		if (status === "authenticated") fetchUserinfo()
	}, [status])

	if (status === "loading") {
		return (
			<Stack padding={2} alignItems="center" gap={2}>
				<CircularProgress size={36} />
				<Typography width="fit-content" mt={2}>
					Loading...
				</Typography>
			</Stack>
		)
	}

	if (status === "unauthenticated") {
		signIn()
	}

	const onTabChange = (_: any, index: number) => setCurrentTab(index)

	return (
		<Stack
			p={{ sm: 1, md: 2 }}
			sx={{ gap: 2 }}
			width="100%"
			direction="column"
			alignItems="center"
		>
			<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
				{loading && (
					<>
						<Stack padding={2} alignItems="center" gap={2}>
							<CircularProgress size={36} />
							<Typography width="fit-content" mt={2}>
								Loading...
							</Typography>
						</Stack>
					</>
				)}
				{user && (
					<>
						<Stack alignItems="center" p={1}>
							<Avatar
								sx={{ width: 56, height: 56 }}
								src={user?.image}
							/>
							<Typography variant="h6">{user?.name}</Typography>
							<Typography>{user?.email}</Typography>
							<PointsChip sx={{ my: 1 }} value={user?.points} />
						</Stack>
						<Divider />
						<Stack>
							<Tabs value={currentTab} onChange={onTabChange}>
								<Tab label="Videos" />
								<Tab label="Blogs" />
							</Tabs>
							<Divider />
						</Stack>
						<TabPanel currentTab={currentTab} index={0}>
							<UsersVideoGrid user={user?.id} />
						</TabPanel>
						<TabPanel currentTab={currentTab} index={1}>
							<UserBlogsList user={user?.id} />
						</TabPanel>
					</>
				)}
			</Paper>
		</Stack>
	)
}

UserPage.getLayout = withAppBarAndDrwaer

function TabPanel({ currentTab, index, children }) {
	return (
		<div role="tabpanel" hidden={currentTab !== index}>
			{currentTab === index && <Stack>{children}</Stack>}
		</div>
	)
}
