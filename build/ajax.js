'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var qs = function qs(data) {
  var results = [];
  for (var name in data) {
    results.push(name + '=' + encodeURIComponent(data[name]));
  }return results.join('&');
};

exports.default = function (headers, options) {
  var request = new XMLHttpRequest();
  var aborted = false;
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || aborted) {
      return;
    }

    if (request.status === 200 && !request._hasError && options.success) {
      try {
        options.success(JSON.parse(request.responseText));
      } catch (e) {
        options.error(request, e);
      }
    } else if (options.error) {
      options.error(request, request._response);
    }
  };

  request.open(options.type, options.url);
  request.setRequestHeader('content-type', options.contentType);

  if (options.xhrFields) {
    Object.keys(options.xhrFields).forEach(function (key) {
      var value = options.xhrFields[key];
      request[key] = value;
    });
  }

  if (headers) {
    Object.keys(headers).forEach(function (key) {
      var value = headers[key];
      request.setRequestHeader(key, value);
    });
  }

  request.send(options.type === 'POST' ? options.data && qs(options.data) : undefined);

  return {
    abort: function abort(reason) {
      aborted = true;
      return request.abort(reason);
    }
  };
};