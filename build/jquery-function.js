"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (subject) {
  var getEvents = function getEvents() {
    return subject.events || {};
  };

  if (subject && subject === subject.window) {
    return {
      0: subject,
      load: function load(handler) {
        return subject.addEventListener("load", handler, false);
      },
      bind: function bind(event, handler) {
        return subject.addEventListener(event, handler, false);
      },
      unbind: function unbind(event, handler) {
        return subject.removeEventListener(event, handler, false);
      }
    };
  }

  return {
    0: subject,
    unbind: function unbind(event, handler) {
      var events = getEvents();
      var handlers = events[event] || [];

      if (handler) {
        var idx = handlers.indexOf(handler);
        if (idx !== -1) {
          handlers.splice(idx, 1);
        }
      } else {
        handlers = [];
      }

      events[event] = handlers;
      subject.events = events;
    },
    bind: function bind(event, handler) {
      var events = getEvents();
      var current = events[event] || [];
      events[event] = current.concat(handler);
      subject.events = events;
    },
    triggerHandler: function triggerHandler(event, args) {
      var _this = this;

      var events = getEvents();
      var handlers = events[event] || [];
      handlers.forEach(function (fn) {
        if (args === undefined) {
          args = { type: event };
        }
        if (!Array.isArray(args)) {
          args = [args];
        }
        if (args && args[0] && args[0].type === undefined) {
          args = [{
            type: event
          }].concat(args || []);
        } else {
          args = args || [];
        }

        fn.apply(_this, args);
      });
    }
  };
};