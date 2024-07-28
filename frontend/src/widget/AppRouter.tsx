import React from "react"
import { useState, useEffect } from "react"
import UserForm from "../page/UserForm"
import ProductList from "../page/ProductList"
import Fetch from "../ajax/fetch"

// Routes between the ProductList and UserForm pages based on if the current user is logged in or not
function AppRouter() {
	const [loggedIn, setLoggedIn] = useState(false)

	async function checkLogin() {
		let res = await Fetch.getURL("/users/login")
		if (res.ok) {
			res.json().then((data) => {
				setLoggedIn(data.loggedIn === true)
			})
		}
	}

	useEffect(() => {
		checkLogin()
	}, [])

	if (loggedIn) {
		return (
			<header className="App-table">
				<ProductList></ProductList>
			</header>
		)
	} else {
		return (
			<header className="App-form">
				<UserForm setLoggedIn={setLoggedIn}></UserForm>
			</header>
		)
	}
}

export default AppRouter
