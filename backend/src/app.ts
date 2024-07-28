import express from "express"
import cors from "cors"

import users from "./users"
import products from "./products"
import session from "./middleware/session"
import errorHandler from "./middleware/error"

import pgp from "pg-promise"

class App {
  public server

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.errorHandling()
  }

  middlewares() {
    this.server.set("trust proxy", 1)
    this.server.use(cors())
    this.server.use(session)
    this.server.use(express.json())
  }

  routes() {
    this.server.options("*", cors())
    this.server.use("/users", users)
    this.server.use("/products", products)
  }

  errorHandling() {
    this.server.use(errorHandler)
  }
}

export default new App().server
