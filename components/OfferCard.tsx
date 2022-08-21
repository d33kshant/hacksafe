import { Stack, Typography } from "@mui/material"
import DOMPurify from "isomorphic-dompurify"
import { marked } from "marked"
import moment from "moment"
import PointsChip from "./PointsChip"

export default function OfferCard({
	data: { benefits, points, redeemedBy, createdBy },
}) {
	return (
		<Stack>
			<div
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(
						marked.parse(benefits.replaceAll("\\n", "\n") || ""),
					),
				}}
			></div>
			<Stack direction="row">
				<PointsChip value={points} />
			</Stack>
			<Typography>
				Added {moment(createdBy).fromNow()} • Redeemed by {redeemedBy}
			</Typography>
		</Stack>
	)
}
