import { Router } from "express"
import queries from "./db/queries"
import passHash from "./util/pass_hash"

const users = Router()
const loginSuccess = "User successfully logged in"
const loginFail = "User failed to log in, check username and password provided"
const registerSuccess = "User successfully registered"
const registerFail = "Unable to register under provided username and password"
const hashPassword = passHash.hashPassword
const comparePassword = passHash.comparePassword

// GET /users/login
// Reports if the given client is currently logged into a session
users.get("/login", async (req, res, next) => {
  res.json({
    loggedIn: req.session.loggedIn,
  })
})

// POST /users/login
// Use user provided username and password to attempt a login
// If username or password is invalid, the login is rejected
users.post("/login", async (req, res, next) => {
  try {
    let pass = await queries.getUserPassword(req.body.username)
    if (await comparePassword(req.body.password, pass.password)) {
      req.session.loggedIn = true
      req.session.userID = pass.id
      return res.json({ message: loginSuccess })
    } else {
      req.session.loggedIn = false
      req.session.userID = 0
      throw loginFail
    }
  } catch (err) {
    console.error(err)
    next(new Error(loginFail))
  }
})

// POST /users/register
// Use user provided username and password to attempt a registration
// If username is taken or the password is empty, the registration is rejected
users.post("/register", async (req, res, next) => {
  try {
    req.body.password = await hashPassword(req.body.password)
    let id = await queries.addUser(req.body)
    req.session.loggedIn = true
    req.session.userID = id.id
    return res.json({ message: registerSuccess })
  } catch (err) {
    console.error(err)
    next(new Error(registerFail))
  }
})

export default users
