import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material"
import DOMPurify from "isomorphic-dompurify"
import { marked } from "marked"
import moment from "moment"
import { useState } from "react"
import PointsChip from "./PointsChip"

export default function OfferCard({
	data: { id, benefits, points, redeemedBy, createdBy },
}) {
	const [currentOffer, setCurrentOffer] = useState(null)
	const onRedeemClicked = async (offerId: string) => {
		const _confirm = confirm("Are you sure you want to redeem this?")
		if (!_confirm) return

		const response = await fetch(`/api/points/redeem?offer=${offerId}`, {
			method: "POST",
			headers: {
				Accepts: "application/json",
				"Content-type": "application/json",
			},
		})
		const data = await response.json()
		if (data.error) return alert(data.error)
		setCurrentOffer(data)
	}
	return (
		<Grid item xs={12} md={6}>
			<Paper sx={{ p: 2 }}>
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							marked.parse(
								benefits.replaceAll("\\n", "\n") || "",
							),
						),
					}}
				></div>
				<Stack pb={1} direction="row">
					<PointsChip
						clickable={true}
						onClick={() => onRedeemClicked(id)}
						sx={{}}
						value={points}
					/>
				</Stack>
				<Typography>
					Added {moment(createdBy).fromNow()} • Redeemed by{" "}
					{redeemedBy}
				</Typography>
			</Paper>
			<Dialog open={Boolean(currentOffer)}>
				<DialogTitle>Offer</DialogTitle>
				<DialogContent>
					<Typography>{currentOffer?.code}</Typography>
					<Typography>Use this code to get the disscount</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setCurrentOffer(null)}>Close</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	)
}
