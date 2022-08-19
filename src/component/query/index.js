import * as React from "react";
import "./index.css";
import {ds} from "../../api"
import {get} from "lodash";
import 'antd/dist/antd.css'
import {getFileItem} from "antd/es/upload/utils";
import MViewer from "../view";
import Search from "../search";

class Query extends React.Component {

    constructor() {
        super();
        this.state = {
            modelKey: '',
            dbKey: '',
            isLoad: true
        };

        this.getAllKey = this.getAllKey.bind(this);
        this.getModelTreeList = this.getModelTreeList.bind(this);
        this.get3DTilesKey = this.get3DTilesKey.bind(this);
        this.get3DTilesDetailedInformation = this.get3DTilesDetailedInformation.bind(this);
    }

    getAllKey()  {
        const dbKey = sessionStorage.getItem('modelDb');
        console.log("hmm_dbKey", dbKey);

        // const {modelCode} = this.props;
        const modelCode = 'M_JfRgkeiZAQ5L'; // 教学楼模型

            ds.model
            .queryModelByModelCode(modelCode)
            .then(result => {
                // console.log('hmm_result', result);
                const modelData = get(result, 'data[0]', {});
                console.log("hmm_modelKey", modelData.modelKey);

                this.setState({
                    dbKey: dbKey,
                    modelKey: modelData.modelKey
                });

            }).catch(error => {
            console.log("error");
        });
    }

    componentDidMount() {
        this.getAllKey();
    }

    getModelTreeList() {
        const {dbKey, modelKey} = this.state;

        ds.model
            .queryModelTreeListByModelKey(dbKey, modelKey)
            .then(result => {
                // const tilesDetailedInformation = get(result, 'data[0]', {});
                console.log(JSON.stringify(result)); // 获取到fileKey

            }).catch(error => {
            console.log("error");
        });
    }

    get3DTilesKey() {
        const tilesCode = '001';
        ds.model
            .query3DTilesKeyBy3DTilesCode(tilesCode)
            .then(result => {
                // console.log('hmm_result', result);
                const tilesData = get(result, 'data[0]', {});
                console.log("hmm_3DTilesData", tilesData);

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

            }).catch(error => {
            console.log("error");
        });

    }

    render() {
        const {modelKey, dbKey, isLoad} = this.state;
        if(isLoad) {
            return <div className="main-model">
                <MViewer modelKey={modelKey} dbKey={dbKey}/>
                <Search/>
                {/*<button onClick={this.getModelTreeList}>get ModelTreeList</button>*/}
                {/*<button onClick={this.get3DTilesKey}>get 3D TilesDataKey</button>*/}
                {/*<button onClick={this.get3DTilesDetailedInformation}>get 3D TilesDetailedInformation</button>*/}
            </div>
        }
    }
}

export default Query;
