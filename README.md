## Create-React-App-Lambda

This project is a reference demo showing you how to use [Create React App v3](https://github.com/facebookincubator/create-react-app) and [netlify-lambda v1](https://github.com/netlify/netlify-lambda) together in a [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta) workflow. You can clone this and immediately be productive with a React app with serverless Netlify Functions in the same repo. Alternatively you can deploy straight to Netlify with this one-click Deploy:

## Project Setup

**Source**: The main addition to base Create-React-App is a new folder: `src/lambda`. This folder is specified and can be changed in the `package.json` script: `"build:lambda": "netlify-lambda build src/lambda"`.

**Dist**: Each JavaScript file in there will be built for Netlify Function deployment in `/built-lambda`, specified in [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex).

As an example, we've included a small `src/lambda/hello.js` function, which will be deployed to `/.netlify/functions/hello`. We've also included an async lambda example using async/await syntax in `async-dadjoke.js`.

## Video

Learn how to set this up yourself (and why everything is the way it is) from scratch in a video: https://www.youtube.com/watch?v=3ldSM98nCHI

## Babel/webpack compilation

All functions (inside `src/lambda`) are compiled with webpack using Babel, so you can use modern JavaScript, import npm modules, etc., without any extra setup.

## Local Development

```bash
## prep steps for first time users
npm i -g netlify-cli # Make sure you have the [Netlify CLI](https://github.com/netlify/cli) installed
git clone https://github.com/netlify/create-react-app-lambda ## clone this repo
cd create-react-app-lambda ## change into this repo
yarn # install all dependencies

## done every time you start up this project
ntl dev ## nice shortcut for `netlify dev`, starts up create-react-app AND a local Node.js server for your Netlify functions
```

This fires up [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta), which:

- Detects that you are running a `create-react-app` project and runs the npm script that contains `react-scripts start`, which in this project is the `start` script
- Detects that you use `netlify-lambda` as a [function builder](https://github.com/netlify/netlify-dev-plugin/#function-builders-function-builder-detection-and-relationship-with-netlify-lambda), and runs the npm script that contains `netlify-lambda build`, which in this project is the `build:lambda` script.

You can view the project locally via Netlify Dev, via `localhost:8888`.

Each function will be available at the same port as well:

- `http://localhost:8888/.netlify/functions/hello` and 
- `http://localhost:8888/.netlify/functions/async-dadjoke`

## Deployment

During deployment, this project is configured, inside `netlify.toml` to run the build `command`: `yarn build`.

`yarn build` corresponds to the npm script `build`, which uses `npm-run-all` (aka `run-p`) to concurrently run `"build:app"` (aka `react-scripts build`) and `build:lambda` (aka `netlify-lambda build src/lambda`).


## Routing and authentication with Netlify Identity

For a full demo of routing and authentication, check this branch: https://github.com/netlify/create-react-app-lambda/pull/18 This example will not be maintained but may be helpful.

## Service Worker

`create-react-app`'s default service worker (in `src/index.js`) does not work with lambda functions out of the box. It prevents calling the function and returns the app itself instead ([Read more](https://github.com/facebook/create-react-app/issues/2237#issuecomment-302693219)). To solve this you have to eject and enhance the service worker configuration in the webpack config. Whitelist the path of your lambda function and you are good to go.


## My Notes for Setup

### Files/Folders 
* lambda (recommended to use async handler over callback)
  * async-dadjokes - async handler using async-await example
  * hello.js - the callback syntax example
* built lambda - generated via CLI
* netlify.toml - netlify config file

### Inital Setup  (I need to add a backend without adding a VPN, how do I do it? NETLIFY)
* install CRA
* install netlify lambda [see docs](https://github.com/sw-yx/netlify-lambda)
  * ```yarn add netlify-lambda```
* create a lambda folder inside the src folder
  * create your lambda function 

### For building netlify functions please read docs
[netlify functions doc](https://docs.netlify.com/functions/build-with-javascript/)

### Must Add Startup Script
Go to package.json folder and add in scripts:
* ``` "build:lambda": "netlify-lambda build src/lambda" ```

### Must Create the netlify.toml file
You can pull example from the docs and customize
[netlify.toml file](https://docs.netlify.com/configure-builds/file-based-configuration/)

### Test functions
go to: http://localhost:8888/.netlify/functions/hello
* you should see "Hi, Ainne!"
go to: http://localhost:8888/.netlify/functions/async-dadjoke
* you should see a joke

#### NEED TO BUILD A PROXY for local server
Because we are fetching from localhost 9000 from origin 3000, it has been blocked by CORS policy. We can fix this by building our own proxy
* [cra docs - build a proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
* See Configuring the Proxy Manually
  * for npm```npm install http-proxy-middleware --save```
  * for yarn```yarn add http-proxy-middleware```

#### DO NOT need proxy when deployed to Netlify
Because it will all be on the same server

