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

        this.getComponentClassList = this.getComponentClassList.bind(this);
        this.getComponentList = this.getComponentList.bind(this);
        this.getData = this.getData.bind(this);
        this.keySearch = this.keySearch.bind(this);
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

    keySearch = () => {

        const {componentList} = this.state;
        let obj = componentList;
        this.findComponent(obj);
        // viewer3D.highlightModelsByKey("M1660527111361");
    }

    findComponent(obj) {
        const input = document.getElementById('ipt').value;
        var keys = [];
        Object.keys(obj).map((key, value) => {
            if(obj[key].name) {
                if(obj[key].name.match(input)) {
                    // console.log("高亮这个构件", obj[key].key, obj[key].name);
                    keys.push(obj[key].key);
                    // viewer3D.highlightModelsByKey(obj[key].key);
                    // viewer3D.highlightComponentsByKey(keys);
                }
            }
            else {
                obj = obj[key];
                this.findComponent(obj)
            }
        });
        if(keys.length === 0) {
            alert("当前条件下无对应构件，请重新选填查找条件");
        }
        else {
            viewer3D.highlightComponentsByKey(keys);
        }
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
                {/*                 onChange={this.getData}*/}

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
                    <button id="highLight" onClick={this.keySearch}>搜索</button>

                </div>
            </div>
        )

    }


}

export default Search;
