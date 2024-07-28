import React from "react"
import DataTable from "react-data-table-component"
import Button from "react-bootstrap/Button"
import { Trash } from "react-bootstrap-icons"
import Fetch from "../ajax/fetch"

interface ProductItem {
	name: string
	price: number
	description: string
	created_by: number
	created_at: string
}

interface ProductTableProps {
	productList: Array<ProductItem>
	getProductList: Function
	toasting: Function
}

// Table widget to render product listing
function ProductTable(props: ProductTableProps) {
	function handleRemove(id: number) {
		return async function () {
			if (!window.confirm("Are you sure you want to remove this item?")) {
				return
			}
			let res = await Fetch.deleteURL(`/products/${id}`)
			if (res.ok) {
				props.getProductList()
				props.toasting("success", "Item removed successfully")
			} else {
				props.toasting("danger", "Unable to remove item")
			}
		}
	}

	const columns = [
		{
			name: "Name",
			selector: (row: ProductItem) => row.name,
			sortable: true,
		},
		{
			name: "Price",
			selector: (row: ProductItem) => row.price,
			sortable: true,
		},
		{
			name: "Description",
			selector: (row: ProductItem) => row.description,
			sortable: true,
		},
		{
			name: "Action",
			sortable: false,
			cell: (row: any, index: any, column: any, id: any) => {
				return (
					<Button variant="danger" size="sm" title="Remove Product" onClick={handleRemove(row.id)}>
						<Trash></Trash>
					</Button>
				)
			},
		},
	]

	const tableCustomStyles = {
		headRow: {
			style: {
				color: "#223336",
				backgroundColor: "#F3F3F3",
			},
		},
		rows: {
			style: {
				"&:nth-child(2n)": {
					backgroundColor: "#FAFAFA",
				},
			},
		},
	}

	return <DataTable fixedHeader={true} pagination={true} columns={columns} data={props.productList} customStyles={tableCustomStyles} />
}

export default ProductTable
