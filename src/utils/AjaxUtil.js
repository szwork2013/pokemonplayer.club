import 'whatwg-fetch'; // Fetch-poilfill
import {polyfill} from 'es6-promise';
polyfill();

let API_URL_BASE = '';

const CONTENT_TYPE = {
    JSON: 'application/json'
};

class AjaxUtil {

    /**
     * @param   {String}      url
     * @param   {Function}    callback(err, data)
     * @return  {fetch}
     */
    static GET(url = '', callback = ()=> {
    }) {
        return this.fetch({
            url: url,
            method: 'GET'
        }, callback);
    }

    /**
     * @param   {String}      url
     * @param   {Object}      body
     * @param   {Function}    callback(err, data)
     * @return  {fetch}
     */
    static POST(url = '', body = null, callback = ()=> {
    }) {
        return this.fetch({
            url: url,
            method: 'POST',
            body: body
        }, callback);
    }

    /**
     * @param   {String}      url
     * @param   {Object}      body
     * @param   {Function}    callback(err, data)
     * @return  {fetch}
     */
    static DELETE(url = '', body = null, callback = ()=> {
    }) {
        return this.fetch({
            url: url,
            method: 'DELETE',
            body: body
        }, callback);
    }

    /**
     * @param   {String}      url
     * @param   {Object}      body
     * @param   {Function}    callback(err, data)
     * @return  {fetch}
     */
    static PUT(url = '', body = null, callback = () => {
    }) {
        return this.fetch({
            url: url,
            method: 'PUT',
            body: body
        }, callback);
    }

    static fetch(request, callback) {

        var options = {
            method: request.method,
            headers: {
                'Content-Type': CONTENT_TYPE.JSON
            },
            mode: 'cors',  // no-cors
            cache: 'default'
        };

        if ('GET' == options.method && request.body) {
            let body = request.body;
            request.url += '?';
            for (var key in body) {
                if (body[key]) {
                    request.url += `&${key}=${body[key]}`;
                } else {
                    request.url += `&${key}=''`;
                }
            }
        } else if (request.body) {
            options.body = JSON.stringify(request.body);
        }

        return fetch(API_URL_BASE + request.url, options).then(res => res.json()).then(res => {

            if (!(callback instanceof Function)) {
                return;
            }

            callback(null, res);
        }).catch(error => {
            if (callback instanceof Function) {
                callback(error);
            }
        });
    }

}

export default AjaxUtil
