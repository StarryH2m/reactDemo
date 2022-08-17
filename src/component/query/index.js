import * as React from "react";
import "./index.css";
import {ds} from "../../api"
import {get} from "lodash";
import {getFileItem} from "antd/es/upload/utils";
import {queryModelTreeListByModelKey} from "../../api/ds/model";

class Query extends React.Component {

    constructor() {
        super();
        this.state = {
            modelKey: '',
            dbKey: ''
        };

        this.renderModel = this.renderModel.bind(this);
        this.get3DTilesKey = this.get3DTilesKey.bind(this);
        this.get3DTilesDetailedInformation = this.get3DTilesDetailedInformation.bind(this);
        this.getModelTreeList = this.getModelTreeList.bind(this);
        this.getModelTreeData = this.getModelTreeData.bind(this);
    }


    componentWillMount() {
    // getModelKey()  {
        // const {modelCode} = this.props;
        const modelCode = 'M_JfRgkeiZAQ5L'; // 教学楼模型
        const databaseKey = sessionStorage.getItem('modelDb');
        console.log("hmm_databaseKey",databaseKey);
        this.setState({
            dbKey: databaseKey,
        })
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
        console.log("this.state", this.state);

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

        const config = {
            modelKey: this.state.modelKey,
            projectKey: this.state.dbKey
        };
        viewer3D.addView(config.modelKey, config.projectKey);
    }

    get3DTilesKey() {
        const tilesCode = '001';
        ds.model
            .query3DTilesKeyBy3DTilesCode(tilesCode)
            .then(result => {
                // console.log('hmm_result', result);
                const tilesData = get(result, 'data[0]', {});
                console.log("hmm_3DTilesData", tilesData);
                // 生成模型数据JSON

            }).catch(error => {
            console.log("error");
        });
    }

    get3DTilesDetailedInformation() {
        const tilesKey = 'G1660527111361';
        ds.model
            .query3DTilesDetailedInformationBy3DTitlesKey(tilesKey)
            .then(result => {
                // const tilesDetailedInformation = get(result, 'data[0]', {});
                console.log("hmm_3DTilesDetailedInformation", result);
                // 生成模型数据JSON

            }).catch(error => {
            console.log("error");
        });
    }

    getModelTreeList() {
        const dbKey = this.state.dbKey;
        const modelKey = this.state.modelKey;
        console.log(dbKey, modelKey);

        ds.model
            .queryModelTreeListByModelKey(dbKey, modelKey)
            .then(result => {
                // const tilesDetailedInformation = get(result, 'data[0]', {});
                console.log(JSON.stringify(result.data))
                // 生成模型数据JSON

            }).catch(error => {
            console.log("error");
        });
    }

    getModelTreeData() {
        const fileKey = 'Z3JvdXAyLE0yRC8wMS8wNS9yQkFBSkdMNW9tYUFNUTRqQUFBdWw4aGZtemc2MjA0Lmd6';
        ds.model
            .queryModelTreeDataByFileKey(fileKey)
            .then(result => {
                // const tilesDetailedInformation = get(result, 'data[0]', {});
                console.log("hmm_modelTreeData", result);
                // 生成模型数据JSON

            }).catch(error => {
            console.log("error");
        });

    }

    render() {

        return (
            <div className="main-container-show" >
                <div className="viewport" id="viewport"></div>
                {/*<button onClick={this.renderModel}>可视化模型</button>*/}
                {/*<button onClick={this.getModelKey}>get构件</button>*/}
                <button onClick={this.get3DTilesKey}>get 3D TilesDataKey</button>
                <button onClick={this.get3DTilesDetailedInformation}>get 3D TilesDetailedInformation</button>
                <button onClick={this.getModelTreeList}>getModelTreeList</button>
                <button onClick={this.getModelTreeData}>getModelTreeData</button>
                {/*<div className="box">*/}
                {/*    <h1>BIM语义查询示例</h1>*/}
                {/*    构件类查询：<select id="search">*/}
                {/*    <option></option>*/}
                {/*</select>*/}
                {/*    关键字查询：<input type="text" placeholder="请输入BIM关键字" ref={input => this.input = input}/>*/}
                {/*    <button>搜索</button>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Query;
