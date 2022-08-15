import request from '../utils/request'
export function doRequest (...args) {
    return request(...args).then(result => {
        if (result.code === 'SUCCESS') {
            return result.data;
        }

        throw Error(result.message);
    });
}
