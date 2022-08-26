import { Box, Grid, Stack, Typography } from "@mui/material"
import moment from "moment"

export default function VideoCard({
	data: { id, title, thumbnail, views, createdAt, status },
}) {
	return (
		<Grid item xs={12} sm={6} md={3} component="a" href={`/videos/${id}`}>
			<Stack direction="column">
				<img
					style={{
						width: "100%",
						maxWidth: "300px",
						objectFit: "cover",
						height: "200px",
						marginBottom: 4,
						borderRadius: 4,
					}}
					src={thumbnail}
				/>
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						width: "280px",
					}}
				>
					<Typography noWrap variant="body1">
						{title}
					</Typography>
				</div>
				<Stack direction="row" gap={1} alignItems="center">
					<Typography color="gray" variant="body2">
						{views} Views • {moment(createdAt).fromNow()}
					</Typography>
					{status && (
						<Typography
							color={
								status === "Published"
									? "green"
									: status === "Pending"
									? "orange"
									: "red"
							}
						>
							{status}
						</Typography>
					)}
				</Stack>
			</Stack>
		</Grid>
	)
}
