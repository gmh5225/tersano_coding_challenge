import cookieSession from "cookie-session"

// Config cookieSession
export default cookieSession({
        name: "ustate",
        keys: ["ts1", "ts2"],
})
