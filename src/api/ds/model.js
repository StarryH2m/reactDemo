import {doRequest, doRequest1} from "../common";
import {BUILDING_ID} from "../config";
import {concat} from "lodash";

/**
 * 根据模型编码获取模型key，用于模型展示
 */
export function queryModelByModelCode(modelCode) {
    return doRequest({
        method: "POST",
        url: `/bosfoundationservice/${BUILDING_ID}/prototype/query/uoModelDocument?noRelation=true`,
        data: {
            "condition": [
                {
                    "field": "bosclass",
                    "operator": "==",
                    "value": "uoModelDocument",
                    "number": "false",
                    "logic": "And"
                },
                {
                    "field": "code",
                    "operator": "==",
                    "value": modelCode,
                    "number": "false",
                    "logic": "And"
                }
            ],
            "select": [
                "modelKey"
            ]
        }
    });
}

/**
 * 根据3D TilesKey获取3D TilesCode
 */
export function query3DTilesKeyBy3DTilesCode(tilesCode) {
    return doRequest({
        method: "POST",
        url: `/bosfoundationservice/${BUILDING_ID}/prototype/query/uoGISModel?noRelation=true`,
        data: {
            "condition": [
                {
                    "field": "bosclass",
                    "operator": "==",
                    "value": "uoGISModel",
                    "number": "false",
                    "logic": "And"
                },
                {
                    "field": "code",
                    "operator": "==",
                    "value": tilesCode, // 此处填入具体的3D Tiles数据编码
                    "number": "false",
                    "logic": "And"
                }
            ],
            "select": [
                "modelKey"
            ]
        }
    });
}

/**
 * 根据3D TilesKey获取3D TilesDetailedInformation
 */
export function query3DTilesDetailedInformationBy3DTitlesKey(tilesKey) {
    return doRequest({
        method: "GET",
        url: `/buildingservice/${BUILDING_ID}/modelGIS/${tilesKey}/queryGISData`,
    });
}

/**
 * 根据modelKey获取模型树列表，返回值有fileKey
 */
export function queryModelTreeListByModelKey(dbKey, modelKey) {
    return doRequest({
        method: "GET",
        url: `/bos3dengine/api/${dbKey}/trees/list?modelKey=${modelKey}`,
    });
}

/**
 * 根据fileKey获取空间树，包括层级、构件类和构件
 */
export function queryModelTreeDataByFileKey(fileKey) {
    return doRequest1({
        method: "GET",
        url: `/bos3dengine/data?fileKey=${fileKey}`,
    });
}
