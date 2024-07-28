import React from "react"
import { useState } from "react"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { Plus } from "react-bootstrap-icons"
import Fetch from "../ajax/fetch"

interface ProductAddProps {
	toasting: Function
	getProductList: Function
}

// Form widget to allow products to be inserted into the product table
function ProductAdd(props: ProductAddProps) {
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState("")

	async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (name === "") {
			props.toasting("danger", "Name is required")
			return
		}
		let res = await Fetch.postURL(`/products/`, {
			name,
			price,
			description,
		})
		if (res.ok) {
			props.getProductList()
			props.toasting("success", "Item added successfully")
			setName("")
			setPrice(0)
			setDescription("")
		} else {
			props.toasting("danger", "Error adding item")
		}
	}

	return (
		<div>
			<hr></hr>
			<Form className="d-flex" onSubmit={handleAdd}>
				<Form.Group as={Row} controlId="formProductName" className="mb-2 me-2">
					<Form.Label column sm="auto">
						Name
					</Form.Label>
					<Col>
						<Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formProductPrice" className="mb-2 me-2">
					<Form.Label column sm="auto">
						Price
					</Form.Label>
					<Col>
						<Form.Control type="number" name="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Enter price" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formProductDescription" className="mb-2 me-2">
					<Form.Label column sm="auto">
						Description
					</Form.Label>
					<Col>
						<Form.Control type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formProductButton" className="mb-2 me-2">
					<Button type="submit" variant="success" title="Add Product" size="sm">
						<Plus></Plus>
					</Button>
				</Form.Group>
			</Form>
			<hr></hr>
		</div>
	)
}

export default ProductAdd
