import { signIn, signOut, useSession } from "next-auth/react"
import { IconButton, Toolbar, Typography, Stack, Avatar, Button, AppBar as AppBarMUI, MenuItem, Menu } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react"

export default function ({ onMenuClick }) {
	const { data, status } = useSession()
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

	const handleClose = () => {
		setMenuAnchor(null)
	}

	return (
		<AppBarMUI elevation={1} position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Stack direction="row" justifyContent="space-between">
				<Toolbar variant="dense">
					<Stack direction="row" alignItems="center" sx={{ sm: { px: 1 } }}>
						<IconButton onClick={onMenuClick} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6">HackSafe</Typography>
					</Stack>
				</Toolbar>
				{status !== "loading" && (
					<Stack direction="row" alignItems="center" px={1}>
						{data?.user ? (
							<IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
								<Avatar sx={{ height: "28px", width: "28px" }} alt="Profile" src={data?.user?.image} />
								<Menu
									id="demo-positioned-menu"
									anchorEl={menuAnchor}
									open={Boolean(menuAnchor)}
									onClose={handleClose}
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
								>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleClose}>My account</MenuItem>
									<MenuItem
										onClick={() => {
											signOut()
											handleClose()
										}}
									>
										Logout
									</MenuItem>
								</Menu>
							</IconButton>
						) : (
							<Button color="inherit" sx={{ mx: 1, py: 0.5 }} variant="text" onClick={() => signIn()}>
								Sign In
							</Button>
						)}
					</Stack>
				)}
			</Stack>
		</AppBarMUI>
	)
}
