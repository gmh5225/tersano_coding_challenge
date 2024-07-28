import pgp from "pg-promise"

const pgpconn = pgp({})

// Database connection: reference backend/.env.local
const db = pgpconn({
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT),
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
})

export default db
