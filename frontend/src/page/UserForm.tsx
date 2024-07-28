import React from "react"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import Fetch from "../ajax/fetch"

interface UserFormProps {
  setLoggedIn: Function
}

// Form page to allow login / registering users
function UserForm(props: UserFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState("")

  function checkInputs() {
    if (username === "") {
      setAlert(`Username cannot be blank`)
      return false
    } else if (password === "") {
      setAlert(`Password cannot be blank`)
      return false
    }
    return true
  }

  async function handleLogin() {
    setAlert("")
    let ok = checkInputs()
    if (!ok) {
      return
    }
    let res = await Fetch.postURL("/users/login", { username, password })
    if (!res.ok) {
      res.text().then((text) => {
        setAlert(text)
      })
    } else {
      props.setLoggedIn(true)
    }
  }

  async function handleRegister() {
    setAlert("")
    let ok = checkInputs()
    if (!ok) {
      return
    }
    let res = await Fetch.postURL("/users/register", { username, password })
    if (!res.ok) {
      res.text().then((text) => {
        setAlert(text)
      })
    } else {
      props.setLoggedIn(true)
    }
  }

  return (
    <div className="User-form">
      <h1>Login or Register to proceed</h1>
      <br></br>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" autoComplete="username" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" autoComplete="new-password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <br></br>

        <Form.Group className="d-grid gap-3">
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="secondary" onClick={handleRegister}>
            Register
          </Button>
        </Form.Group>
      </Form>
      <br></br>
      <Alert show={alert !== ""} variant="danger">
        {alert}
      </Alert>
    </div>
  )
}

export default UserForm
