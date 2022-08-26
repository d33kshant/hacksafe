import OfferCard from "@/components/OfferCard"
import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import fetcher from "@/lib/fetcher"
import { CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material"
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
		<Stack width="100%" alignItems="center">
			<Stack sx={{ width: "100%", maxWidth: "1200px", p: 2 }}>
				<Grid spacing={2} container>
					{data.map((offer) => (
						<OfferCard key={offer.id} data={offer} />
					))}
				</Grid>
			</Stack>
		</Stack>
	)
}

OffersPage.getLayout = withAppBarAndDrwaer
