import PointsChip from "@/components/PointsChip"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { ThumbUpAltOutlined } from "@mui/icons-material"
import {
	Button,
	Checkbox,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	Link,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"

export default function QuizPage() {
	const router = useRouter()
	const { id } = router.query

	const [formState, _setFormState] = useState({})
	const { data, error } = useSWR("/api/quizzes?id=" + id, fetcher)

	const setFormState = (key: string, value: number[]) => {
		const _formState = { ...formState }
		_formState[key] = value
		_setFormState(_formState)
	}

	const submitQuiz = async () => {
		const _confirm = confirm("Are you sure you want to submit?")
		if (!_confirm) return

		const response = await fetch("/api/submit", {
			method: "POST",
			headers: {
				Accepts: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify(formState),
		})
		const data = await response.json()
		if (data.error) return alert(data.alert)
		alert(data.message)
	}

	return (
		<Stack
			width="100%"
			alignItems="center"
			p={{ xs: 1, md: 2 }}
			gap={{ xs: 1, md: 2 }}
		>
			<Paper sx={{ width: "100%", maxWidth: "1000px" }}>
				{!error && data && (
					<>
						<Stack gap={1} p={3}>
							<Stack gap={1} direction="row">
								<Typography flex={1} variant="h4">
									{data.title}
								</Typography>
								<PointsChip value={data.points} />
							</Stack>
							<Typography mb={1} color="gray">
								{data.description}
							</Typography>
							{/* <Stack direction="row" gap={1}>
								{data.tags.map((tag, index) => (
									<Chip clickable variant="outlined" key={index} label={tag} />
								))}
							</Stack> */}
							<Stack direction="row" gap={1} alignItems="center">
								<IconButton>
									<ThumbUpAltOutlined />
								</IconButton>
								<Typography>
									{data.likes} Likes • {data.views} Views •{" "}
									{moment(data.createdAt).fromNow()}
								</Typography>
							</Stack>
						</Stack>
						<Divider />
						<Stack>
							{data.questions?.map((question) => (
								<Question
									setSelection={setFormState}
									selections={formState[question.id] || []}
									key={question.id}
									data={question}
								/>
							))}
						</Stack>
						<Divider />
						<Button
							onClick={submitQuiz}
							variant="contained"
							color="success"
						>
							Submit
						</Button>
					</>
				)}
			</Paper>
		</Stack>
	)
}

function Question({
	setSelection,
	selections,
	data: { id, question, options, multiple },
}) {
	const onOptionSelect = (index: number) => {
		if (multiple) {
			if (selections.indexOf(index) !== -1) {
				const _selection = [...selections].filter(
					(selection) => selection !== index,
				)
				_selection.sort()
				setSelection(id, _selection)
			} else {
				const _selection = [...selections, index]
				_selection.sort()
				setSelection(id, _selection)
			}
		} else {
			const _selection = [index]
			setSelection(id, _selection)
		}
	}

	return (
		<>
			<Stack p={3} gap={2}>
				<Typography variant="h6">{question}</Typography>
				<Stack>
					<FormControl>
						{multiple ? (
							<>
								<FormGroup sx={{ alignItems: "start" }}>
									{options.map((option, index) => (
										<FormControlLabel
											key={index}
											onChange={() =>
												onOptionSelect(index)
											}
											control={
												<Checkbox
													checked={
														selections.indexOf(
															index,
														) !== -1
													}
												/>
											}
											label={option}
										/>
									))}
								</FormGroup>
							</>
						) : (
							<>
								<RadioGroup name={`radio-group-${id}`}>
									{options.map((option, index) => (
										<FormControlLabel
											onChange={() =>
												onOptionSelect(index)
											}
											value={option}
											key={index}
											control={
												<Radio
													checked={
														selections.indexOf(
															index,
														) !== -1
													}
												/>
											}
											label={option}
										/>
									))}
								</RadioGroup>
							</>
						)}
					</FormControl>
				</Stack>
				<Typography
					sx={{ cursor: "pointer" }}
					onClick={() => setSelection(id, [])}
					color="gray"
				>
					Clear Selection
				</Typography>
			</Stack>
			<Divider />
		</>
	)
}

QuizPage.getLayout = withAppBarAndDrwaer
