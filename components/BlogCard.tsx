import { Chip, Divider, Stack, Typography } from "@mui/material"
import moment from "moment"

export default function ({ data: { id, banner, title, tags, createdAt } }) {
	return (
		<>
			<Stack p={2} width="100%" gap={2} direction="row">
				<img style={{ maxWidth: 240 }} src={banner} alt={title} />
				<Stack gap={2}>
					<Typography color="royalblue" component="a" href={`/blogs/${id}`}>
						{title}
					</Typography>
					<Stack flex={1} gap={1} direction="row">
						{tags.map((tag: string, index: number) => (
							<Chip variant="outlined" clickable key={index} label={tag} />
						))}
					</Stack>
					<Typography color="gray">{moment(createdAt).fromNow()}</Typography>
				</Stack>
			</Stack>
			<Divider />
		</>
	)
}
