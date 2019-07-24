import axios from 'axios';

class Requests {
    static dlsApiGet(params, successCallback, errorCallback) {
        var str = "";
        for (var key in params) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(params[key]);
        }
        axios.get('/dls/api?'+str)
            .then((response) => {
                successCallback(response;
            })
            .catch((error) => {
                errorCallback(error);
            });
    }
}
export default Requests;