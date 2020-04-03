"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqueryDeferred = require("jquery-deferred");

var _jqueryDeferred2 = _interopRequireDefault(_jqueryDeferred);

var _jqueryFunction = require("./jquery-function");

var _jqueryFunction2 = _interopRequireDefault(_jqueryFunction);

var _ajax2 = require("./ajax");

var _ajax3 = _interopRequireDefault(_ajax2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jqueryObj = _jqueryDeferred2.default.extend(_jqueryFunction2.default, _jqueryDeferred2.default, {
  defaultAjaxHeaders: null,
  ajax: function ajax() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ajax3.default.apply(undefined, [jqueryObj.defaultAjaxHeaders].concat(args));
  },
  inArray: function inArray(arr, item) {
    return arr.indexOf(item) !== -1;
  },
  trim: function trim(str) {
    return str && str.trim();
  },
  isEmptyObject: function isEmptyObject(obj) {
    return !obj || Object.keys(obj).length === 0;
  },
  makeArray: function makeArray(arr) {
    return [].slice.call(arr, 0);
  },
  support: {
    cors: true
  },
  param: function param(source) {
    var array = [];
    for (var key in source) {
      array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
    }
    return array.join("&");
  }
});

exports.default = jqueryObj;