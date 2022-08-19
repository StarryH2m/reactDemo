import * as React from "react";
import 'antd/dist/antd.css'
import {getFileItem} from "antd/es/upload/utils";

class MViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {modelKey, dbKey} = nextProps;
        const html  = document.querySelector("html");
        document.querySelector('.viewport').style.width = html.clientWidth + 'px';
        document.querySelector('.viewport').style.height = html.clientHeight - 1 + 'px';

        const option = {
            host: "http://building-bos3d.rickricks.com",
            viewport: "viewport",
        };
        const viewer3D = new BOS3D.Viewer(option);

        // let bos3dui = new BOS3DUI({
        //     viewer3D,
        //     BOS3D: BOS3D,
        // });

        const config = {
            model_Key: modelKey,
            db_Key: dbKey
        };
        viewer3D.addView(config.model_Key, config.db_Key);
    }

    render() {

        return <div className="viewport" id="viewport">

        </div>
    }
}

export default MViewer;

