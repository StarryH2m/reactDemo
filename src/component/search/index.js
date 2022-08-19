import * as React from "react";
import {ds} from "../../api"
import {Select} from 'antd'
import 'antd/dist/antd.css'
import "./index.css";


const Option = Select.Option;

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            treeList: [],
            componentClassList: [],
            componentList: [],
        };

        this.getModelTreeData = this.getModelTreeData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getModelTreeData();
    }

    // 语义查询检索
    getModelTreeData() {
        const fileKey = 'Z3JvdXAyLE0yRC8wMS8wNS9yQkFBSkdMNW9tYUFNUTRqQUFBdWw4aGZtemc2MjA0Lmd6';
        ds.model
            .queryModelTreeDataByFileKey(fileKey)
            .then(result => {
                console.log("hmm_modelTreeData", result);

                this.setState({
                    treeList: result,
                })

            }).catch(error => {
            console.log("error");
        });
    }

    getComponentClassList = (value) => {
        const {treeList} = this.state;
        let cClassList  = [];

        Object.keys(treeList).map(key => {
            if((Object.keys(treeList).indexOf(key).toString()) === value) {
                cClassList = treeList[key];
            }
        })

        this.setState({
            componentClassList: cClassList,
        })

    }

    getComponentList = (value) => {
        const {componentClassList} = this.state;
        let cList = [];

        Object.keys(componentClassList).map(key => {
            if((Object.keys(componentClassList).indexOf(key).toString()) === value) {
                cList = componentClassList[key];
            }
        })

        this.setState({
            componentList: cList,
        })
    }

    getData = (value) => {
        console.log(`selected ${value}`);
    }


    // 高亮查询到的构件
    keySearch = (view3D) => {

        var input = document.getElementById('ipt').value;
        Object.keys(this.state.componentList).map((key, value) => {
            if(this.state.componentList[key].name.match(input)) {
                // this.setHighLight(this.state.componentList[key].key);
                // viewer3D.highlightComponentsByKey(this.state.componentList[key].key);
                console.log("高亮这个构件")
            }
        })
        // this.state.componentList[key].key
    }

    render() {

        return (
            <div className="main-search">

                <div className="box">
                    楼层：<Select style={{ width: 100, marginRight: '5px' }}
                                placeholder="楼层"
                                onChange={this.getComponentClassList}
                >
                    {
                        Object.keys(this.state.treeList).map((key, value) => {
                            return (
                                <Option key={value}>{key}</Option>
                            )
                        })
                    }
                </Select>

                    构件类：<Select style={{ width: 150, marginRight: '5px' }}
                                placeholder="构件类"
                                onChange={this.getComponentList}
                >
                    {
                        Object.keys(this.state.componentClassList).map((key, value) => {
                            return (
                                <Option key={value}>{key}</Option>
                            )
                        })
                    }
                </Select>

                {/*    构件名称：<Select style={{ width: 200, marginRight: '5px' }}*/}
                {/*                 placeholder="构件名称"*/}
                {/*                 onChange={this.getData()}*/}

                {/*>*/}
                {/*    {*/}
                {/*        Object.keys(this.state.componentList).map((key, value) => {*/}
                {/*            return (*/}
                {/*                <Option key={value}>{this.state.componentList[key].name}</Option>*/}
                {/*            )*/}
                {/*        })*/}

                {/*    }*/}
                {/*</Select>*/}

                    构件名称：<input id="ipt" type="text" placeholder="构件名称" ref={input => this.input = input}  />
                    <button id="highLight">搜索</button>


                </div>
            </div>
        )
    }
}

export default Search;
