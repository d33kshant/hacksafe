import OfferCard from "@/components/OfferCard"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { CircularProgress, Paper, Stack, Typography } from "@mui/material"
import useSWR from "swr"

export default function OffersPage() {
	const { data, error } = useSWR("/api/offers", fetcher)

	if (error || data?.error) {
		return (
			<Stack>
				<Typography>Failed to fetch the data</Typography>
			</Stack>
		)
	}

	if (!data && !error) {
		return (
			<Stack>
				<CircularProgress size={36} />
				<Typography>Loading</Typography>
			</Stack>
		)
	}

	return (
		<Stack>
			<Paper>
				{data.map((offer) => (
					<OfferCard key={offer.id} data={offer} />
				))}
			</Paper>
		</Stack>
	)
}

OffersPage.getLayout = withAppBarAndDrwaer
