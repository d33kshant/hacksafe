import { Chip, Divider, Stack, Typography } from "@mui/material"
import moment from "moment"

export default function ({ data: { id, title, author, updatedAt, tags, likes, answers } }) {
	return (
		<>
			<Stack px={2} py={2}>
				<Typography color="royalblue" component="a" href={`/forum/${id}`} variant="h6">
					{title}
				</Typography>
				<Stack my={1} gap={1} direction="row" alignItems="center">
					{tags.map((tag: string, index: number) => (
						<Chip clickable variant="outlined" key={index} component="a" href={`/forum?tag=${tag}`} label={tag} />
					))}
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<Typography fontSize={14} color="gray">
						{likes} Likes • {answers} Replies
					</Typography>
					<Typography fontSize={14} color="gray">
						by {author} • {moment(updatedAt).fromNow()}
					</Typography>
				</Stack>
			</Stack>
			<Divider />
		</>
	)
}
