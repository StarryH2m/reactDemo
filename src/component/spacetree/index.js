import * as React from "react";
import {ds} from "../../api";


class SpaceTree extends React.Component{
    constructor() {
        super();
        this.state = {
            treeList: '',
            // componentClassList: '',
            // getComponentList: ''
        }
    }

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

    componentDidMount() {
        this.getModelTreeData();
    }

    getTreeStructures(obj) {
        // const {treeList} = this.state;
        let value = obj;
        if(typeof obj ==="object") {
            value = Object.keys(obj).map((key, value) => {
                if(typeof obj[key] === "object") {
                    return (
                        <div className={key}>
                            <div className="space-tree" style={{marginLeft: 20}}>
                                {/*<strong>{key}</strong>*/}
                                {/*{this.getTreeStructures(obj[key])}*/}

                                <span>
                                    <input type="checkbox" value={value}/>{key}
                                </span>
                                {this.getTreeStructures(obj[key])}
                            </div>
                        </div>
                    );
                }

                return (
                    <div className={key}>
                        <div style={{marginLeft: 20}}>
                            <span>
                                <input type="checkbox" value={value}/>{key}: {obj[key]}
                            </span>
                        </div>
                    </div>
                );
            })
        }
        return value;
    }

    render() {
        const {treeList} = this.state;
        const tree = this.getTreeStructures(treeList);

        return (
            <div className="main-tree">
                <div className="">空间树</div>
                {tree}

            </div>
        )
    }

}

export default SpaceTree;
