import db from "./connection"

// Attempts to select a given user's hashed password by username
async function getUserPassword(username: string) {
  return await db.one(
    `select id, password
      from app_user 
      where username = $1`,
    [username],
  )
}

interface User {
  username: string
  password: string
}

// Attempts to insert a new user by provided username and password
async function addUser(user: User) {
  return await db.one(
    `insert into app_user(username, password)
      values ($1, $2)
      RETURNING id`,
    [user.username, user.password],
  )
}

// Retrieves all products from product collection
async function getAllProducts() {
  return await db.any(`SELECT * FROM product`)
}

interface Product {
  name: string
  price: number
  description: string
}

// Attempts to insert a product by provided product object and userID
async function addProduct(product: Product, userID: number) {
  await db.none(
    `insert into product(name, price, description, created_by, created_at)
      values ($1, $2, $3, $4, now())`,
    [product.name, product.price, product.description, userID],
  )
}

// Attempts to delete a product by provided productID
async function deleteProduct(productID: number) {
  return await db.none(
    `delete from product
      where id = $1`,
    [productID],
  )
}

export default {
  getUserPassword,
  addUser,
  getAllProducts,
  addProduct,
  deleteProduct,
}
