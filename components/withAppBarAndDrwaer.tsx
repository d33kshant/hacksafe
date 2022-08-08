import { Stack } from "@mui/material"
import { useState } from "react"
import AppBar from "./AppBar"
import SideBar from "./SideBar"

export default function (page) {
	const [drawerOpen, setDrawerOepn] = useState(false)
	return (
		<>
			<AppBar onMenuClick={() => setDrawerOepn(false)} />
			<Stack direction="row">
				<SideBar open={drawerOpen} onClose={() => setDrawerOepn(false)} />
				{page}
			</Stack>
		</>
	)
}
