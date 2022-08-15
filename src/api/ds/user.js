import {toPairs} from "lodash";
import {BUILDING_ID} from "../config";
import {doRequest} from "../common";


export function login (option = {}) {
    const formData = new FormData();
    toPairs(option).forEach(([ name, value ]) => formData.set(name, value));
    return doRequest({
        method: 'POST',
        url: `/bospersonnelservice/${BUILDING_ID}/users/login`,
        data: formData
    });
}
