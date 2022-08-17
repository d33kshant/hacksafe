import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"

export default function Home() {
	return (
		<div>
			<main>Home Page</main>
		</div>
	)
}

Home.getLayout = withAppBarAndDrwaer
