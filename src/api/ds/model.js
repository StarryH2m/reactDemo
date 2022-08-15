import {doRequest} from "../common";
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
            // condition: concat(
            //     [
            //         {
            //             field: 'bosclass',
            //             operator: '==',
            //             value: 'uoModelDocument',
            //             number: 'false',
            //             logic: 'And'
            //         }
            //     ],
            //     modelCode
            //         ? [
            //             {
            //                 field: 'code',
            //                 operator: '==',
            //                 value: modelCode,
            //                 number: 'false',
            //                 logic: 'And'
            //             }
            //         ]
            //         : []
            // )
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
            // "select": [
            //     "modelKey"
            // ]
        }
    });
}
