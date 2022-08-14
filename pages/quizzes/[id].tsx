import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { Checkbox, Chip, Divider, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"
import useSWR from "swr"

export default function QuizPage() {
	const router = useRouter()
	const { id } = router.query

	const { data, error } = useSWR("/api/quizzes?id=" + id, fetcher)

	return (
		<Stack width="100%" alignItems="center" p={{ xs: 1, md: 2 }} gap={{ xs: 1, md: 2 }}>
			<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
				{!error && data && (
					<>
						<Stack gap={1} p={2}>
							<Typography variant="h5">{data.title}</Typography>
							<Typography color="gray">{data.description}</Typography>
							<Stack direction="row" gap={1}>
								{data.tags.map((tag, index) => (
									<Chip clickable variant="outlined" key={index} label={tag} />
								))}
							</Stack>
							<Typography>
								{data.views} Views • {data.likes} Likes • {moment(data.createdAt).fromNow()}
							</Typography>
						</Stack>
						<Divider />
						<Stack>
							{data.questions.map((question, index) => (
								<Question key={index} data={question} onSelect={() => {}} />
							))}
						</Stack>
					</>
				)}
			</Paper>
		</Stack>
	)
}

function Question({ onSelect, data: { question, options, multiple } }) {
	return (
		<>
			<Stack p={3} gap={2}>
				<Typography variant="h6">{question}</Typography>
				<Stack>
					{multiple ? (
						<>
							<FormGroup sx={{ alignItems: "start" }}>
								{options.map((option, index) => (
									<FormControlLabel key={index} control={<Checkbox />} label={option} />
								))}
							</FormGroup>
						</>
					) : (
						<>
							<RadioGroup>
								{options.map((option, index) => (
									<FormControlLabel key={index} control={<Radio />} label={option} />
								))}
							</RadioGroup>
						</>
					)}
				</Stack>
			</Stack>
			<Divider />
		</>
	)
}

QuizPage.getLayout = withAppBarAndDrwaer
