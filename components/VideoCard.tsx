import { Box, Grid, Stack, Typography } from "@mui/material"
import moment from "moment"

export default function ({ data: { id, title, thumbnail, views, updatedAt } }) {
	return (
		<Grid item xs={12} sm={6} md={3} component="a" href={`/videos/${id}`}>
			<Stack direction="column">
				<img
					style={{
						width: "100%",
						maxWidth: "250px",
						objectFit: "cover",
						marginBottom: 4,
						borderRadius: 4,
					}}
					src={thumbnail}
				/>
				<Typography variant="body1">{title}</Typography>
				<Typography color="gray" variant="body2">
					{views} Views • {moment(updatedAt).fromNow()}
				</Typography>
			</Stack>
		</Grid>
	)
}
