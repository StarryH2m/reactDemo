import React, { Component } from 'react'
import { Select } from 'antd';
import Model from './data';
import 'antd/dist/antd.css';
import {ds} from "../../api";

const Option = Select.Option;
export default class Demo extends Component{
    state={
        capitals:[], // 省份
        city:[], // 市
        areaList:[], // 区
    }
    componentDidMount () {
        this.handleAddressData();
    }
    handleAddressData=()=>{
        // const da = Model.get();
        // if(da && da.length>0){
        //     this.setState({
        //         capitals:da,
        //     })
        // }

        const fileKey = 'Z3JvdXAyLE0yRC8wMS8wNS9yQkFBSkdMNW9tYUFNUTRqQUFBdWw4aGZtemc2MjA0Lmd6';
        ds.model
            .queryModelTreeDataByFileKey(fileKey)
            .then(result => {
                console.log("hmm_modelTreeData", result);

                this.setState({
                    capitals: result,
                })

            }).catch(error => {
            console.log("error");
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    getCity=(value)=>{
        const {capitals} = this.state;
        let da=[];
        // capitals.map(item=>{
        //     if(item.name === value){
        //         da=item.cityList
        //     }
        // })
        Object.keys(capitals).map(key => {
            if((Object.keys(capitals).indexOf(key).toString()) === value) {
                da = capitals[key];
            }
        })

        this.setState({
            city:da,
        })

    }
    getSreaList=(value)=>{
        const {city} = this.state;
        console.log("...", this.state.city)
        let ci =[];
        // city.map(item=>{
        //     if(item.name === value){
        //         ci = item.areaList
        //     }
        // })
        Object.keys(city).map(key => {
            if((Object.keys(city).indexOf(key).toString()) === value) {
                ci = city[key];
            }
        })
        this.setState({
            areaList:ci,
        })
    }
    getData=(value) =>{
        console.log(`selected ${value}`);
    }
    render(){
        return(
            <div style={{padding:'20px'}}>
                <Select
                    showSearch
                    style={{ width: 128 ,marginRight:'5px'}}
                    placeholder="省份"
                    optionFilterProp="children"
                    onChange={this.getCity}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                    //     this.state.capitals.map((item) =>{
                    //     // eslint-disable-next-line no-unused-expressions
                    //     return(
                    //         <Option key={item.name} >{item.name}</Option>
                    //     )
                    // })
                        Object.keys(this.state.capitals).map((key, value) => {
                            return (
                                <Option key={value}>{key}</Option>
                            )
                        })
                    }
                </Select>
                <Select
                    showSearch
                    style={{ width: 128,marginRight:'5px' }}
                    placeholder="市"
                    optionFilterProp="children"
                    onChange={this.getSreaList}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                    //     this.state.city.map(item=>{
                    //     return(
                    //         <Option key={item.name} >{item.name}</Option>
                    //     )
                    // })
                        Object.keys(this.state.city).map((key, value) => {
                            return (
                                <Option key={value}>{key}</Option>
                            )
                        })
                    }
                </Select>
                <Select
                    showSearch
                    style={{ width: 128 }}
                    placeholder="区"
                    optionFilterProp="children"
                    onChange={this.getData}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                    //     this.state.areaList.map(item=>{
                    //     return(
                    //         <Option key={item} >{item}</Option>
                    //     )
                    // })
                        Object.keys(this.state.areaList).map((key, value) => {
                            return (
                                <Option key={value}>{this.state.areaList[key].name}</Option>
                            )
                        })

                    }
                </Select>
            </div>
        )
    }
}
