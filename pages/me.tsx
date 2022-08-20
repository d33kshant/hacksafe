import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import {
	Avatar,
	CircularProgress,
	Divider,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UserPage() {
	const { data, status } = useSession()
	const [authenticated, setAuthenticated] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUserinfo = async () => {
			const response = await fetch("/api/user?email=" + data?.user?.email)
			const json = await response.json()
			if (json.error) return alert(json.error)
			setUser(json)
			console.log(json)
		}
		fetchUserinfo()
	}, [authenticated])

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

	if (!authenticated) setAuthenticated(true)

	return (
		<Stack
			p={{ sm: 1, md: 2 }}
			sx={{ gap: 2 }}
			width="100%"
			direction="column"
			alignItems="center"
		>
			<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
				<Stack alignItems="center" p={1}>
					<Avatar
						sx={{ width: 56, height: 56 }}
						src={data?.user?.image}
					/>
					<Typography variant="h6">{data?.user?.name}</Typography>
					<Typography>{data?.user?.email}</Typography>
				</Stack>
				<Divider />
				<Stack p={2}></Stack>
			</Paper>
		</Stack>
	)
}

UserPage.getLayout = withAppBarAndDrwaer
