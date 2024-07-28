import { Router } from "express"
import queries from "./db/queries"

const products = Router()
const loginRequired = "You must be logged in to access the /products APIs"
const addedSuccess = "Product added successfully"
const deletedSuccess = "Product deleted successfully"
const listError = "Unable to fetch product listing"
const addError = "Unable to add new product"
const deleteError = "Unable to remove product"

// Products middleware to enforce logged in user
products.use((req, res, next) => {
  if (req.session.loggedIn === true) {
    next()
  } else {
    next(new Error(loginRequired))
  }
})

// GET /products/
// Return the list of products stored in the product table
products.get("/", async (req, res, next) => {
  try {
    return res.json(await queries.getAllProducts())
  } catch (err) {
    console.error(err)
    next(new Error(listError))
  }
})

// POST /products/
// Add the user provided product to the product table
products.post("/", async (req, res, next) => {
  try {
    if (req.session.userID <= 0) {
      throw "Need logged in user id"
    }
    await queries.addProduct(req.body, req.session.userID)
    return res.json({ message: addedSuccess })
  } catch (err) {
    console.error(err)
    next(new Error(addError))
  }
})

// DELETE /products/:id
// Remove the product with the provided id from the product table
products.delete("/:id", async (req, res, next) => {
  try {
    await queries.deleteProduct(parseInt(req.params.id))
    return res.json({ message: deletedSuccess })
  } catch (err) {
    console.error(err)
    next(new Error(deleteError))
  }
})

export default products
