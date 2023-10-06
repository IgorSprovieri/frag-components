# Frag Components

The perfect library to create SPA (Single Page Applications)

## For Developers

- Starting a new app using npx:

```console
  npx create-frag-app my-app
```

- Read the docs: [Frag Components Wiki for developers](https://github.com/IgorSprovieri/create-frag-app/wiki)

## Example

```js
import { jsx, fragment, FragComponent, virtualDOM } from "frag-components";

class Component extends FragComponent {
  render() {
    return <h1>Hello World!</h1>;
  }
}

const App = new Component();

virtualDOM.render(App);
```

## For Contributors

Frag Components is a Open Source library and you can be a contributor

1- See the Notion to know the nexts steps of the project:

[Frag Componens Notion](https://www.notion.so/Frag-Components-89ec7ec975444117b1655304317c2d43?pvs=4)

2- Use the GitHub issues to report bugs and fixes:

[Frag Componens Issues](https://github.com/IgorSprovieri/frag-components/issues)

## Contributor Docs

See the Frag Components Wiki: [Frag Components Wiki for contributors](https://github.com/IgorSprovieri/frag-components/wiki)

## Getting Started

1- Clone the repo

```console
  git clone https://github.com/IgorSprovieri/frag-components.git
```

2- Install dependecies:

```console
npm install
```

3- Create dist/index.html file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script src="bundle.js"></script>
</html>
```

4- Create .babelrc file:

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "pragmaFrag": "fragment"
      }
    ]
  ]
}
```

5- Create webpack.config.js file:

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./test/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
        publicPath: "/",
      },
    ],
    compress: true,
    port: 3000,
  },
};
```

6- Create test/index.js file:

```js
import { jsx, fragment, FragComponent, virtualDOM } from "../index";

class Component extends FragComponent {
  render() {
    return <></>;
  }
}

const App = new Component();

virtualDOM.render(App);
```

7- Build the project

```console
npm run build
```

8- Start the project

```console
npm run start
```
