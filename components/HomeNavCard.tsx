import { Divider, Grid, Stack, Typography } from "@mui/material"

export default function HomeNavigationCard({ href, title, description, icon }) {
	return (
		<Grid component="a" href={href} item xs={12} md={6}>
			<Stack direction="row">
				<Stack pl={3} pt={4}>
					{icon}
				</Stack>
				<Stack p={3}>
					<Typography variant="h6">{title}</Typography>
					<Typography mt={1}>{description}</Typography>
				</Stack>
				<Divider orientation="vertical" flexItem />
			</Stack>
			<Divider />
		</Grid>
	)
}
