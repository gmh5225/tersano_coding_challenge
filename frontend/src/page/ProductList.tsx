import { useState, useEffect } from "react"
import AppToast from "../widget/AppToast"
import ProductAdd from "../widget/ProductAdd"
import ProductTable from "../widget/ProductTable"
import Fetch from "../ajax/fetch"

// Product List page
function ProductList() {
	const [productList, setProductList] = useState([])
	const [toast, setToast] = useState("")
	const [toastStyle, setToastStyle] = useState("")

	async function getProductList() {
		let res = await Fetch.getURL("/products/")
		if (res.ok) {
			res.json().then((data) => {
				setProductList(data)
			})
		}
	}

	function toasting(style: string, message: string) {
		setToastStyle(style)
		setToast(message)
	}

	useEffect(() => {
		getProductList()
	}, [])

	return (
		<div>
			<h1>Product Listing</h1>
			<ProductAdd toasting={toasting} getProductList={getProductList} />
			<ProductTable productList={productList} toasting={toasting} getProductList={getProductList} />
			<AppToast toast={toast} toastStyle={toastStyle} setToast={setToast} />
		</div>
	)
}

export default ProductList
