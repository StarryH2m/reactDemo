import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {ds} from "../../api"
import {get} from "lodash";
class Show extends React.Component {

    constructor() {
        super();
        this.state = {
            modelKey: '',
        };

        // this.getModelKey = this.getModelKey.bind(this);
        this.renderModel = this.renderModel.bind(this);
    }


    componentWillMount() {
        const {modelCode} = this.props;
        console.log("hmm_modelCode", modelCode);
            ds.model
            .queryModelByModelCode(modelCode)
            .then(result => {
                // console.log('hmm_result', result);
                const modelData = get(result, 'data[0]', {});
                // 生成模型数据JSON
                console.log("hmm_modelData", modelData);

                this.setState({
                    modelKey: modelData.modelKey
                });

            }).catch(error => {
            console.log("error");
        });
    }

    renderModel() {

        console.log("hmm_this.state", this.state);
        console.log(this.state.modelKey);
        const html  = document.querySelector("html");
        document.querySelector('.viewport').style.width = html.clientWidth + 'px';
        document.querySelector('.viewport').style.height = html.clientHeight - 1 + 'px';

        const option = {
            host: "http://building-bos3d.rickricks.com",
            viewport: "viewport",
        };
        const viewer3D = new BOS3D.Viewer(option);
        // window.bos3dui = new BOS3DUI({
        //     viewer3D,
        //     BOS3D: BOS3D,
        // });

        const databaseKey = sessionStorage.getItem('modelDb');
        console.log("hmm_databaseKey",databaseKey);

        const config = {
            modelKey: this.state.modelKey,
            projectKey: databaseKey
        };
        viewer3D.addView(config.modelKey, config.projectKey);
        // viewer3D.addView("M1654091244162", "p4e42c78ae8142539874a8e6f577979a");
    }

    render() {

        return (
            <div className="main-container-query" >
                <div className="viewport" id="viewport" >
                    {/*<button onClick={this.componentWillMount}></button>*/}
                    <button onClick={this.renderModel}>点击</button>
                </div>
            </div>
        )
    }
}

export default ;
