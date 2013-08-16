function S4() {
    return (0 | 65536 * (1 + Math.random())).toString(16).substring(1);
}

function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter() {
    return {};
}

function apiCall(_options, _callback) {
    if (Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient({
            timeout: _options.timeout || 7e3
        });
        xhr.open(_options.type, _options.url);
        xhr.onload = function() {
            _callback({
                success: true,
                status: 200 == xhr.status ? "ok" : xhr.status,
                code: xhr.status,
                responseText: xhr.responseText || null,
                responseData: xhr.responseData || null
            });
        };
        xhr.onerror = function(e) {
            _callback({
                success: false,
                status: "error",
                code: xhr.status,
                data: e.error,
                responseText: xhr.responseText
            });
            Ti.API.error("[REST API] apiCall ERROR: " + xhr.responseText);
            Ti.API.error("[SQL REST API] apiCall ERROR CODE: " + xhr.status);
        };
        for (var header in _options.headers) xhr.setRequestHeader(header, _options.headers[header]);
        _options.beforeSend && _options.beforeSend(xhr);
        xhr.send(_options.data || null);
    } else _callback({
        success: false,
        status: "offline",
        responseText: null
    });
}

function Sync(method, model, opts) {
    var DEBUG = model.config.debug;
    model.idAttribute = model.config.adapter.idAttribute || "id";
    var parentNode = model.config.parentNode;
    var methodMap = {
        create: "POST",
        read: "GET",
        update: "PUT",
        "delete": "DELETE"
    };
    var type = methodMap[method];
    var params = _.extend({}, opts);
    params.type = type;
    params.headers = params.headers || {};
    if (model.config.hasOwnProperty("headers")) for (header in model.config.headers) params.headers[header] = model.config.headers[header];
    if (!params.url) {
        params.url = model.config.URL || model.url();
        if (!params.url) {
            Ti.API.error("[REST API] ERROR: NO BASE URL");
            return;
        }
    }
    if (Alloy.Backbone.emulateJSON) {
        params.contentType = "application/x-www-form-urlencoded";
        params.processData = true;
        params.data = params.data ? {
            model: params.data
        } : {};
    }
    if (Alloy.Backbone.emulateHTTP && ("PUT" === type || "DELETE" === type)) {
        Alloy.Backbone.emulateJSON && (params.data._method = type);
        params.type = "POST";
        params.beforeSend = function() {
            params.headers["X-HTTP-Method-Override"] = type;
        };
    }
    params.headers["Content-Type"] = "application/json";
    logger(DEBUG, "REST METHOD", method);
    switch (method) {
      case "create":
        params.data = JSON.stringify(model.toJSON());
        logger(DEBUG, "create options", params);
        apiCall(params, function(_response) {
            if (_response.success) {
                var data = parseJSON(DEBUG, _response, parentNode);
                void 0 == data[model.idAttribute] && (data[model.idAttribute] = guid());
                params.success(data, JSON.stringify(data));
                model.trigger("fetch");
            } else {
                params.error(JSON.parse(_response.responseText), _response.responseText);
                Ti.API.error("[REST API] CREATE ERROR: ");
                Ti.API.error(_response);
            }
        });
        break;

      case "read":
        model[model.idAttribute] && (params.url = params.url + "/" + model[model.idAttribute]);
        params.urlparams && (params.url = encodeData(params.urlparams, params.url));
        logger(DEBUG, "read options", params);
        apiCall(params, function(_response) {
            if (_response.success) {
                var data = parseJSON(DEBUG, _response, parentNode);
                var values = [];
                model.length = 0;
                for (var i in data) {
                    var item = {};
                    item = data[i];
                    void 0 == item[model.idAttribute] && (item[model.idAttribute] = guid());
                    values.push(item);
                    model.length++;
                }
                params.success(1 === model.length ? values[0] : values, _response.responseText);
                model.trigger("fetch");
            } else {
                params.error(JSON.parse(_response.responseText), _response.responseText);
                Ti.API.error("[REST API] READ ERROR: ");
                Ti.API.error(_response);
            }
        });
        break;

      case "update":
        if (!model[model.idAttribute]) {
            params.error(null, "MISSING MODEL ID");
            Ti.API.error("[REST API] ERROR: MISSING MODEL ID");
            return;
        }
        if (-1 == _.indexOf(params.url, "?")) params.url = params.url + "/" + model[model.idAttribute]; else {
            var str = params.url.split("?");
            params.url = str[0] + "/" + model[model.idAttribute] + "?" + str[1];
        }
        params.urlparams && (params.url = encodeData(params.urlparams, params.url));
        params.data = JSON.stringify(model.toJSON());
        logger(DEBUG, "update options", params);
        apiCall(params, function(_response) {
            if (_response.success) {
                var data = parseJSON(DEBUG, _response, parentNode);
                params.success(data, JSON.stringify(data));
                model.trigger("fetch");
            } else {
                params.error(JSON.parse(_response.responseText), _response.responseText);
                Ti.API.error("[REST API] UPDATE ERROR: ");
                Ti.API.error(_response);
            }
        });
        break;

      case "delete":
        if (!model[model.idAttribute]) {
            params.error(null, "MISSING MODEL ID");
            Ti.API.error("[REST API] ERROR: MISSING MODEL ID");
            return;
        }
        params.url = params.url + "/" + model[model.idAttribute];
        logger(DEBUG, "delete options", params);
        apiCall(params, function(_response) {
            if (_response.success) {
                parseJSON(DEBUG, _response, parentNode);
                params.success(null, _response.responseText);
                model.trigger("fetch");
            } else {
                params.error(JSON.parse(_response.responseText), _response.responseText);
                Ti.API.error("[REST API] DELETE ERROR: ");
                Ti.API.error(_response);
            }
        });
    }
}

function logger(DEBUG, message, data) {
    if (DEBUG) {
        Ti.API.debug("[REST API] " + message);
        Ti.API.debug(data);
    }
}

function parseJSON(DEBUG, _response, parentNode) {
    var data = JSON.parse(_response.responseText);
    _.isUndefined(parentNode) || (data = _.isFunction(parentNode) ? parentNode(data) : traverseProperties(data, parentNode));
    logger(DEBUG, "server response", data);
    return data;
}

function traverseProperties(object, string) {
    var explodedString = string.split(".");
    for (i = 0, l = explodedString.length; l > i; i++) object = object[explodedString[i]];
    return object;
}

function encodeData(obj, url) {
    var str = [];
    for (var p in obj) str.push(Ti.Network.encodeURIComponent(p) + "=" + Ti.Network.encodeURIComponent(obj[p]));
    return -1 == _.indexOf(url, "?") ? url + "?" + str.join("&") : url + "&" + str.join("&");
}

var _ = require("alloy/underscore")._;

var Alloy = require("alloy"), Backbone = Alloy.Backbone;

module.exports.sync = Sync;

module.exports.beforeModelCreate = function(config) {
    config = config || {};
    InitAdapter(config);
    return config;
};

module.exports.afterModelCreate = function(Model) {
    Model = Model || {};
    Model.prototype.config.Model = Model;
    Model.prototype.idAttribute = Model.prototype.config.adapter.idAttribute;
    return Model;
};