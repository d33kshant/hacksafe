import { Avatar, Chip, Divider, Stack, Typography } from "@mui/material"
import moment from "moment"

export default function ({
	data: { id, title, user, updatedAt, tags, likes, answers },
}) {
	return (
		<>
			<Stack px={2} py={2}>
				<Typography
					color="royalblue"
					component="a"
					href={`/forum/${id}`}
					variant="h6"
				>
					{title}
				</Typography>
				<Stack my={1} gap={1} direction="row" alignItems="center">
					{tags.map((tag: string, index: number) => (
						<Chip
							clickable
							variant="outlined"
							key={index}
							component="a"
							href={`/forum?tag=${tag}`}
							label={tag}
						/>
					))}
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<Typography fontSize={14} color="gray">
						{likes} Likes • {answers} Replies
					</Typography>
					<Stack gap={1} alignItems="center" direction="row">
						<Avatar
							sx={{ width: 24, height: 24 }}
							src={user?.image}
						/>
						<Typography fontSize={14} color="gray">
							{user?.name} • {moment(updatedAt).fromNow()}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Divider />
		</>
	)
}
