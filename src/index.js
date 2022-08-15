
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./component/login";
import Show from "./component/show";

// const modelCode = 'M_1mSL12fqhpXn'; // 办公室模型
const modelCode = 'M_JfRgkeiZAQ5L'; // 教学楼模型
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Login/>
        <Show modelCode={modelCode}/>
    </div>

);
