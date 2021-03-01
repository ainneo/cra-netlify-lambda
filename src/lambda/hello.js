// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
// see docs for building functions: https://docs.netlify.com/functions/build-with-javascript/
// this is a very basic serverless function
export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Hello, Ainne!' }),
  })
}
