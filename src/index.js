
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./component/login";
import Query from "./component/query";


// const modelCode = 'M_1mSL12fqhpXn'; // 办公室模型


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/*<App />*/}
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='' element={<Login/>}></Route>
            <Route path='/query' element={<Query/>}></Route>
        </Routes>
    </BrowserRouter>

);


