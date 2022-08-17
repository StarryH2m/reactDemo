import request from '../utils/request'
export function doRequest (...args) {
    return request(...args).then(result => {
        if (result.code === 'SUCCESS') {
            return result.data;
        }

        throw Error(result.message);
    });
}

export function doRequest1(...args) {
    return request(...args).then(result => {
        if (result) {
            return result;
        }
        throw Error("error");
    });
}
