import { Stack, useMediaQuery } from "@mui/material"
import { useState } from "react"
import AppBar from "./AppBar"
import SideBar from "./SideBar"

export default function (page) {
	const [drawerOpen, setDrawerOepn] = useState(false)
	const smallScreen = useMediaQuery("(max-width: 750px)")

	const openDrawer = () => {
		if (smallScreen) {
			setDrawerOepn(prev => !prev)
		}
	}

	return (
		<>
			<AppBar onMenuClick={openDrawer} />
			<Stack direction="row">
				<SideBar variant={smallScreen ? "temporary" : "permanent"} open={drawerOpen} onClose={() => setDrawerOepn(false)} />
				{page}
			</Stack>
		</>
	)
}
