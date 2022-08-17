
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import axios from "axios";
import { toPairs } from 'lodash'
import {config} from "../../api";
import {ds} from '../../api'

class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            loginUser: '',
            loginToken: '',
            loginExpires: '',
            databaseKey: ''
        };

        this.getRequestData = this.getRequestData.bind(this);
        this.getRequestData1 = this.getRequestData1.bind(this);
        this.getRequestData2 = this.getRequestData2.bind(this);
    }

    getRequestData2 = (event) => {
        const {loginUser, loginToken, loginExpires, databaseKey} = this.state;

        // 已经登录直接返回上次登录结果, 不需要重复登录
        if ([loginUser, loginToken, loginExpires, databaseKey].find(Boolean) === 4
            && parseInt(loginExpires) < new Date().getTime() + 5 * 60 * 1000) {
            return Promise.resolve({
                user: loginUser,
                access_token: loginToken,
                expires: loginExpires,
                modelDb: databaseKey
            })
        }

        return ds.user.login({
            name: config.BOS_USERNAME,
            password: config.BOS_PASSWORD
        }).then(result => {
            console.log("hmm_result", result);
            const {access_token: AccessToken, expires, user, modelDb} = result;
            Object.assign(this.state, {
                loginUser: user,
                loginToken: AccessToken,
                loginExpires: expires,
                databaseKey: modelDb
            });

            // 保存到会话
            sessionStorage.setItem('ds.loginUser', JSON.stringify(user));
            sessionStorage.setItem('ds.loginExpires', expires);

            sessionStorage.setItem('token', AccessToken);
            sessionStorage.setItem('modelDb', modelDb);
            console.log("this.state", this.state);

            return result;
        });
    }

    getRequestData1 = (event) => {
        // const BUILDING_ID = 'h716bbee0d6448749152ef02678de279';
        // const BOS_USERNAME = '086-13003503305'
        // const BOS_PASSWORD = 'Admin123'
        const BUILDING_ID = 'vd169e72e727480fbd546b33ab22f498';
        const BOS_USERNAME = '086-18821635077';
        const BOS_PASSWORD = '21635077';

        console.log("hmm_authorization_sessionStorage", sessionStorage.getItem('token'));

        return login({
            name: BOS_USERNAME,
            password: BOS_PASSWORD
        }).then(result => {
            const { access_token: AccessToken, expires, user, modelDb } = result.data;
            Object.assign(this.state, {
                loginUser: user,
                loginToken: AccessToken,
                loginExpires: expires,
                databaseKey: modelDb
            });

            // 保存到会话
            sessionStorage.setItem('loginUser', JSON.stringify(user));
            sessionStorage.setItem('loginExpires', expires);
            sessionStorage.setItem('token', AccessToken);
            sessionStorage.setItem('modelDb', modelDb);
            console.log("this.state", this.state);

            return result;
        });

        function login (option = {}) {
            const formData = new FormData();
            toPairs(option).forEach(([ name, value ]) => formData.set(name, value));
            return doRequest({
                method: 'POST',
                url: `http://building-bos.rickricks.com/bospersonnelservice/${BUILDING_ID}/users/login`,
                data: formData
            });
        }

        function doRequest (...args) {
            // return request(...args).then(result => {
            return axios.request(...args).then(result => {
                console.log("result", result);
                if (result.data.code === 'SUCCESS') {
                    return result.data
                }

                throw Error(result.data.message);
            })
        }

    }

    getRequestData = (event) => {

        const BUILDING_ID = 'vd169e72e727480fbd546b33ab22f498';
        const url = `http://building-bos.rickricks.com/bospersonnelservice/${BUILDING_ID}/users/login`;
        console.log("hmm_authorization_sessionStorage", sessionStorage.getItem('token'));
        // console.log("hmm_authorization_localStorage", localStorage.getItem('token'));

        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('name', '086-18821635077');
        data.append('password', '21635077');

        var config = {
            method: 'post',
            url: url,
            headers: {
                data
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="main-contain-login">
                <button id="first-button" className="main-container-first-button" onClick={this.getRequestData2}>获取登录用户信息</button>
            </div>
        )
    }
}

export default Login;

