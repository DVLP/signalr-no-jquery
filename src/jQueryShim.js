'use strict';

const jQueryDeferred = require('jquery-deferred');
const jQueryParam = require('jquery-param');

const jqueryFunction = function(subject) {
  let events = subject.events || {};

  if (subject && subject === subject.window)
    return {
      0: subject,
      load: (handler) => subject.addEventListener('load', handler, false),
      bind: (event, handler) => subject.addEventListener(event, handler, false),
      unbind: (event, handler) => subject.removeEventListener(event, handler, false)
    };

  return {
    0: subject,

    unbind(event, handler) {
      let handlers = events[event] || [];

      if (handler) {
        let idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      } else handlers = [];

      events[event] = handlers;
      subject.events = events;

    },
    bind(event, handler) {
      let current = events[event] || [];
      events[event] = current.concat(handler);
      subject.events = events;
    },
    triggerHandler(event, args) {
      let handlers = events[event] || [];
      handlers.forEach(fn => {
        if (args && args[0] && args[0].type === undefined) {
          args = [{
            type: event
          }].concat(args || []);
        } else {
          args = args || [];
        }

        fn.apply(this, args);
      });
    }
  };
};

const xhr = function() {
  try {
    return new window.XMLHttpRequest();
  } catch (e) {}
};

const ajax = function(options) {
  const request = xhr();
  
  if (options.xhrFields && options.xhrFields.withCredentials) {
    request.withCredentials = true;
  }
  
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200 && !request._hasError) {
      try {
        options.success && options.success(JSON.parse(request.responseText));
      } catch (e) {
        options.error && options.error(request);
      }
    } else {
      options.error && options.error(request);
    }
  };

  request.withCredentials = options.xhrFields.withCredentials;
  request.open(options.type, options.url);
  request.setRequestHeader('content-type', options.contentType);
  request.send(options.data.data && `data=${encodeURIComponent(options.data.data)}`);

  return {
    abort: function(reason) {
      return request.abort(reason);
    }
  };
};

module.exports = jQueryDeferred.extend(
  jqueryFunction,
  jQueryDeferred,
  {
    defaultAjaxHeaders: null,
    ajax: ajax,
    inArray: (arr,item) => arr.indexOf(item) !== -1,
    trim: str => str && str.trim(),
    isEmptyObject: obj => !obj || Object.keys(obj).length === 0,
    makeArray: arr => [].slice.call(arr,0),
    param: obj => jQueryParam(obj),
    support: {
      cors: (function() {
        const xhrObj = xhr();
        return !!xhrObj && ("withCredentials" in xhrObj);
      })()
    }
  })
  
