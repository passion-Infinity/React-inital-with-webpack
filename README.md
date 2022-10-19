# Tạo dự án ReactJS với Webpack và Babel

## Getting Started
> _tip_: Bạn có thể tạo nhanh dự án ReactJS với câu lệnh npx create-react-app

### 1.Cấu trúc dự án
react-webpack # thư mục gốc
    | src # thư mục chứa source code chính
        | components # thư mục chứa components
        | index.js # File khởi tạo, render App vào #root
    | public
        | index.html # HTML page, nơi chứa #root element

### 2.Khởi tạo dự án
* Khởi tạo dự án với Node Package Manager
```bash
npm init
```
* Cài đặt thư viện quản lý source code với webpack trong quá trình dev
```bash
npm install webpack webpack-cli --save-dev
```
* Cài đặt thư viện React
```bash
npm install react@17.0.2 react-dom@17.0.2 --save
```
* Cài đặt thư viện hỗ trợ chuyển đổi mã nguồn React về Javascript
```bash
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
``` 
`babel-core`: Chuyển đổi `ES6` về `ES5`
`babel-loader`: Cho phép chuyển các files Javascript sử dụng Babel & Webpack
`babel-preset-env`: Cài đặt sẵn giúp bạn sử dụng Javascript mới nhất trên nhiều môi trường khác nhau (nhiều trình duyệt khác nhau). Gói này đơn giản là support truyển đổi ES6, ES7, ES8, ES… về ES5.
`babel-preset-react`: Hỗ trợ chuyển đổi JSX về Javascript
* Tại thư mục gốc của dự án tạo file `public/index.html` và thêm thẻ `#root` element vào thẻ `body`
![Alt text](images/add-root.png?raw=true "Image 1")
* Tại thư mục gốc của dự án tạo file `src/index.js` và thêm vào nội dung sau":
```js
import React from "react"
// import ReactDOM from 'react-dom' // React@17
import ReactDOM from 'react-dom/client' // React@18

function App() {
    return (
        <div>
            <h1>ReatJS For DanhNLC</h1>
        </div>
    )
}

// React@17
// ReactDOM.render(<App />, document.getElementById('root'))

// React@18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```
* Cài đặt `CSS-Loader` và `Style-Loader` 2 thư viện này giúp webpack có thể tải file `.css` dưới dạng` module`.
```bash
npm install css-loader style-loader --save-dev
```
* Tạo file `webpack.config.js` tại thư mục gốc của dự án với nội dung sau:
```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Dẫn tới file index.js ta đã tạo
  output: {
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
    filename: "bundle.js" // Tên file được build ra
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"]
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
  ]
};
```
* Tại thư mực gốc của dự án tạo file `.babelrc` dùng để cấu hình cho thư viện Babel.
```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```
Cài đặt này để cho Babel biết sử dụng `preset-env` và `preset-react` trong việc hỗ trợ chuyển đổi mã.
* Thêm scripts cho dự án tại file package.json
```json
"scripts": {
    ...
    "start": "webpack --mode development --watch",
    "build": "webpack --mode production"
}
```
### Chạy dự án với Live Server (VSCode)
* Chạy dự án
```bash
npm start
```
- Sau khi chạy xong, dự án sẽ tạo ra file `build/bundle.js `theo cấu hình trong file `webpack.config.js`
- Thêm thẻ script link tới file `build/bundle.js` trong file `public/index.html`
- Chạy dự án với Live Server
![Alt text](images/add-script-run-live-server.png?raw=true "Image 2")


### Chạy dự án với webpack-server-dev
* Cài đặt thư viện giúp chạy dự án mà ko cần làm thủ công việc link thẻ script vào `public/index.html`
```bash
npm install html-webpack-plugin --save-dev
```
* Cấu hình Webpack để thêm html-webpack-plugin vào dự án tại file `webpack.config.js`
```js
...
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
```
![Alt text](images/html-webpack-plugin.png?raw=true "Image 3")
* Cài đặt webpack-dev-server
```bash
npm install webpack-dev-server --save-dev
```
* Sửa lại cấu hình scripts trong `package.json`:
```json
"scripts": {
    ...
    "start": "webpack-dev-server --mode development --open --hot",
    ...
}
```