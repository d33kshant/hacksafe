import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "@/lib/theme"
import createEmotionCache from "@/lib/createEmotionCache"
import "../styles/globals.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props
	const getLayout = Component.getLayout || ((page) => page)

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
			</ThemeProvider>
		</CacheProvider>
	)
}
