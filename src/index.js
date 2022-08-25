import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./component/login";
import Query from "./component/query";
import Demo from "./component/demo";
import Search from "./component/search"
import SpaceTree from "./component/spacetree";
import Viewer from "./component/view";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/*<App />*/}
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='' element={<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/query' element={<Query/>}></Route>
            <Route path='/demo' element={<Demo/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/spacetree' element={<SpaceTree/>}></Route>
            <Route path='/model' element={<Viewer/>}></Route>
        </Routes>
    </BrowserRouter>

);


