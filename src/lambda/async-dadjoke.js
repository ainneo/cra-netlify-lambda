// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311
// see docs for building functions: https://docs.netlify.com/functions/build-with-javascript/

import axios from "axios";

export async function handler(event, context) {
  try {
    const response = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}



// export async function handler(event, context) {
//   try {
//     const response = await axios.get("https://gnews.io/api/v4/search?q=technology&token=e75d97437a447619e7baf217e5c2165d", { headers: { Accept: "application/json" })
//     const data = response.data
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ data })
//     }
//   } catch (err) {
//     console.log(err) // output to netlify function log
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
// }
