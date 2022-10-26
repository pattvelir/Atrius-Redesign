// IE11 does not support using Event constructors (new Event())
// If we cannot use the constructor, we'll use a re-implementation of PopStateEvent
// instead of the native one.

// This was derived from the CustomEvent polyfill on MDN: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

(function () {
  function PopStateEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      state: undefined,
    };
    var evt = document.createEvent("PopStateEvent");
    evt.initPopStateEvent(
      event,
      params.state,
      params.bubbles,
      params.cancelable,
    );
    return evt;
  }

  PopStateEvent.prototype = window.PopStateEvent.prototype;

  try {
    new window.PopStateEvent("test");
  } catch (error) {
    window.PopStateEvent = PopStateEvent;
  }
})();
