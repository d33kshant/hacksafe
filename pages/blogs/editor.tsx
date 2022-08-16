import withAppBarAndDrwaer from "@/components/withAppBarAndDrwaer"
import { Button, Divider, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { marked } from "marked"
import { useRouter } from "next/router"
// import DOMPurify from "dompurify"

const INITIAL_STATE = {
	title: "",
	body: "",
	banner: "",
	tags: "",
}

const DEFAULT_MARKDOWN = '<p align="center">Nothing to show, Try writing some stuffs.</p>'

export default function BlogEditor() {
	const router = useRouter()
	const { id } = router.query

	const [isNew, setIsNew] = useState(true)
	const [isFetching, setIsFetching] = useState(false)
	const [currentTab, setCurrentTab] = useState(0)
	const [formState, setFormState] = useState(INITIAL_STATE)

	const changeTab = (_: unknown, tabIndex: number) => setCurrentTab(tabIndex)

	useEffect(() => {
		const fetchBlog = async () => {
			setIsFetching(true)
			const response = await fetch("/api/blogs?id=" + id)
			const data = await response.json()

			if (data.error) return alert(data.error)

			setFormState({ title: data.title, tags: data.tags.join(", "), body: data.body, banner: data.banner })
			setIsFetching(true)
		}
		if (id) {
			setIsNew(false)
			fetchBlog()
		}
		return () => setFormState(INITIAL_STATE)
	}, [id])

	const updateFormState = (key: string, value: string) => {
		const _formState = { ...formState }
		_formState[key] = value
		setFormState(_formState)
	}

	const onInputChage = (event) => updateFormState(event.target.name, event.target.value)

	function getMarkdownText(text: string) {
		var rawMarkup = /* DOMPurify.sanitize( */ marked.parse(text || DEFAULT_MARKDOWN) /* ) */
		return { __html: rawMarkup }
	}

	const postTheBlog = () => {
		if (isNew) {
			// TODO: post
		} else {
			// TODO: put
		}
	}

	return (
		<>
			<Stack sx={{ p: 2, gap: 2 }} width="100%" direction="column" alignItems="center">
				<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
					<Stack alignItems="ce" direction="row" py={1} px={2}>
						<Typography flex={1} fontWeight={500}>
							Blog's details
						</Typography>
					</Stack>
					<Divider />
					<Stack p={2} gap={2}>
						<TextField name="title" onChange={onInputChage} fullWidth label="Title" placeholder="An interasting title for your blog" variant="filled" />
						<TextField name="banner" onChange={onInputChage} fullWidth label="Banner" placeholder="URL for the banner image" variant="filled" />
						<TextField name="tags" onChange={onInputChage} fullWidth label="Tags" placeholder="Seprate tags with comma, eg: password-sefty, tutorial, tips-and-tricks etc." variant="filled" />
					</Stack>
				</Paper>
				<Paper sx={{ width: "100%", maxWidth: "1200px" }}>
					<Tabs value={currentTab} onChange={changeTab}>
						<Tab label="Editor" />
						<Tab label="Preview" />
					</Tabs>
					<Divider />
					<TabPanel currentTab={currentTab} index={0}>
						<TextField value={formState.body} name="body" onChange={onInputChage} multiline minRows={10} variant="filled" placeholder="Start writting your blog with markdown" />
					</TabPanel>
					<TabPanel currentTab={currentTab} index={1}>
						<div dangerouslySetInnerHTML={getMarkdownText(formState.body)}></div>
					</TabPanel>
					<Divider />
					<Stack p={2} justifyContent="end">
						<Button onClick={postTheBlog} sx={{ boxShadow: 0 }} variant="contained" color="success">
							Post the blog
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</>
	)
}

function TabPanel({ currentTab, index, children }) {
	return (
		<div role="tabpanel" hidden={currentTab !== index}>
			{currentTab === index && <Stack sx={{ p: 3 }}>{children}</Stack>}
		</div>
	)
}

BlogEditor.getLayout = withAppBarAndDrwaer
