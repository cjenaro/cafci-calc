exports.handler = async (event, context) => {
  console.log(ctx, event)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello" })
  }
}
