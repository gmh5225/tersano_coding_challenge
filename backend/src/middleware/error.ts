// Error handler, attempt to send as string with 500 status if headers have not yet been sent
const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send(err.toString())
}

export default errorHandler
