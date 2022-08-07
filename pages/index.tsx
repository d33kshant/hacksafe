import { signIn, signOut } from "next-auth/react"
export default function Home() {
	return (
		<div>
			<main>
				<div>
					<button onClick={() => signIn()} style={{ padding: "4px 8px", fontFamily: "inherit", fontSize: 16, margin: "4px" }}>
						Sign In
					</button>
					<button onClick={() => signOut()} style={{ padding: "4px 8px", fontFamily: "inherit", fontSize: 16, margin: "4px" }}>
						Sign Out
					</button>
				</div>
			</main>
		</div>
	)
}
