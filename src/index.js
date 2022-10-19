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