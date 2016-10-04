document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  if( !_eventsource ) {
    let _eventsource = [] || window._eventsource;  
  }

  let es = new EventSource('http://localhost:8000/events');
  
  es.addEventListener('message', function onmessage(e) {
    console.log('message received');
    if (_eventsource[0].cssSelector) {
      document.querySelector(_eventsource[0].cssSelector).innerHTML = e.data;
    }
  });
});