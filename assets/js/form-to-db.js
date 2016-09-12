---
layout: blank
---

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(data, success) {
  var url = 'https://form-to-db.herokuapp.com/';
  var body = JSON.stringify(data);

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert("{{ site.form-to-db_config.message_erreur}}" + ' : CORS non supporté');
    return;
  }

  xhr.setRequestHeader('Content-Type', 'application/json');

  // Response handlers.
  xhr.onload = success;

  // Error Handler
  xhr.onerror = function() {
    alert("{{ site.form-to-db_config.message_erreur}}" + ' : Erreur inconnue');
  };

  xhr.send(body);
}
