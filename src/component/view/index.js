import * as React from "react";
import 'antd/dist/antd.css'
import {getFileItem} from "antd/es/upload/utils";

class Viewer extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    componentWillReceiveProps(nextProps) {
        const {modelKey, dbKey} = nextProps;
        const html  = document.querySelector("html");
        document.querySelector('.viewport').style.width = html.clientWidth + 'px';
        document.querySelector('.viewport').style.height = html.clientHeight - 1 + 'px';

        const option = {
            host: "http://building-bos3d.rickricks.com",
            viewport: "viewport",
        };
        window.viewer3D = new BOS3D.Viewer(option);

        // window.bos3dui = new BOS3DUI({
        //     viewer3D,
        //     BOS3D: BOS3D,
        // });

        const config = {
            model_Key: modelKey,
            db_Key: dbKey
        };
        viewer3D.addView(config.model_Key, config.db_Key);
        // viewer3D.addView('M1660527111361', 'pb905a5984e3497ead3ca098b971481c');

    }

    render() {

        return (
            <div className="viewport" id="viewport">

            </div>
        )

    }
}

export default Viewer;

