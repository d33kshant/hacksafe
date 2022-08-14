import { Chip, Divider, Stack, Typography } from "@mui/material"
import PointsChip from "./PointsChip"

export default function ({ data: { id, title, description, createdAt, tags, points, questions } }) {
	return (
		<>
			<Stack p={2} gap={1} component="a" href={`/quizzes/${id}`}>
				<Typography variant="h5">{title}</Typography>
				<Typography fontWeight={500} color="royalblue">
					{questions} Questions
				</Typography>
				<Typography color="grey">{description}</Typography>
				<Stack gap={1} direction="row">
					<PointsChip value={points} />
					{tags.map((tag, index) => (
						<Chip key={index} label={tag} variant="outlined" clickable />
					))}
				</Stack>
			</Stack>
			<Divider />
		</>
	)
}
