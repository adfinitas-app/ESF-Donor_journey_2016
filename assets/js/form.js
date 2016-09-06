---
layout: blank
---

function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}

function getFields(jqForm, selector) {
  var FormData = {};
  jqForm.find(selector).each(function() {
    if ($(this).attr("type") === "radio") {
      if ($(this).is(":checked"))
      FormData[$(this).attr("name")] = $(this).val();
    } else if ($(this).attr("type") === "checkbox") {
      if ($(this).is(":checked")) {
	var concat = FormData[$(this).attr("name")] || "";
	if (concat.length === 0) {
	  FormData[$(this).attr("name")] = $(this).val();
	} else {
	  FormData[$(this).attr("name")] =
	    concat + ", " + $(this).val();
	}
      }
    } else if ($(this).prop("tagName") === "SELECT") {
      FormData[$(this).attr("name")] = $(this).find("option:selected").val();
    } else {
      FormData[$(this).attr("name")] = $(this).val();
    }
  });
  return (FormData);
}

function submitForm(jqForm) {
  var FormData = getFields(jqForm, "input:not([type=submit]):not(.no-send), select, textarea");
  /*
  woopra.track("inscription", {
    url: document.URL,
    title: document.title,
    origine: jqForm.data("source"),
    optin: "non" // Champ "Optin Woopra" oui/non ?
  });
  */
  var visitorProperties = getFields(jqForm, "input:not([type=submit]):not(.no-send).visitor_property, select.visitor_property, textarea.visitor_property");
  if (visitorProperties['firstname'] && visitorProperties['lastname']) {
    visitorProperties['name'] = visitorProperties['firstname'] + ' ' + visitorProperties['lastname'];
  }
  woopra.identify(visitorProperties);
  woopra.track('adfinitas-' + jqForm.data("source"), FormData);
  var now = new Date();
  var dbData = {
    "schema": "{{ site.form-to-db_config.schema }}",
    "db": {
      "signin_date": now.toString(),
      "event_woopra": pureField(jqForm.data("source"))
    }
  }
  for (var attrname in FormData) {
    dbData.db[attrname] = pureField(FormData[attrname]);
  }
  var success = function() {
    window.location = jqForm.data("success");
  };
  makeCorsRequest(dbData, success);
}

// Pre-filled inputs from query parameter in URL.
// Example : https://example.com?name=test&email=test@test.com
// will fill the field name and email
function preFill() {
  // Static keyword to hide the field in URL.
  // Example : https://example.com?name_hide=test
  // will hide the field name and fill it
  var hideKeyword = "_hide";
  // Function located in assets/js/app.js
  var params = extractUrlParams();
  Object.keys(params).forEach(function(key) {
    var toHide = false;
    var name = key;
    var value = params[key];
    if (key.substring(key.length - hideKeyword.length) == hideKeyword) {
      toHide = true;
      var name = key.substring(0, key.length - hideKeyword.length);
    }
    if ($("select[name='" + name + "']").length > 0) {
      var selector = $("select[name='" + name + "'] option[value='" + value + "']");
      selector.prop("selected", true);
    } else if ($("input:radio[name='" + name + "']").length > 0) {
      var selector = $("input:radio[name='" + name + "'][value='" + value + "']");
      selector.prop("checked", true);
    } else if ($("input:checkbox[name='" + name + "']").length > 0) {
      var selector = $("input:checkbox[name='" + name + "'][value='" + value + "']");
      selector.prop("checked", true);
    } else if ($("input[name='" + name + "']").length > 0 &&
	       $("input[name='" + name + "']").hasClass("check-phone")) {
      var selector = $("input[name='" + name + "']");
      selector.intlTelInput("setNumber", value);
    } else if ($("input[name='" + name + "']").length > 0) {
      var selector = $("input[name='" + name + "']");
      selector.val(value);
    } else if ($("textarea[name='" + name + "']").length > 0) {
      var selector = $("textarea[name='" + name + "']");
      selector.val(value);
    } else {
      return;
    }
    if (toHide == true) {
      if (isValidField(selector, !selector.prop("required")) === false) {
	// Only un-fill the wrong value if this is an text/email input.
	// However nothing happens
	if (selector.attr('type') === 'text' || selector.attr('type') === 'email') {
	  selector.val("");
	}
      } else {
	selector.closest(".field-row").css("display", "none")
      }
    }
  });
}

function otherChoice() {
  $(".other-choice-text").each(function() {
    $(this).on("keydown", function() {
      var elemId = $(this).attr("id");
      var id = elemId.substr("other-".length);
      if ($(this).val() === "") {
	$("#input-" + id).prop("checked", false);
      } else {
	$("#input-" + id).prop("checked", true);
      }
    });
  });
}

$(document).ready(function() {
  $(".check-phone").intlTelInput({
    "utilsScript": "/assets/js/vendor/intl-tel-input/build/js/utils.js",
    "initialCountry": "fr",
    "autoFormat": true
  }).done(function() {
    preFill();
  });
  var jqForm = $("form.adfinitas-cx");
  jqForm.on("submit", function(e) {
    e.preventDefault();
    $(".other-choice-text").each(function() {
      var elemId = $(this).attr("id");
      var id = elemId.substr("other-".length);
      $("#input-" + id).val($(this).val());
    });
    if (isValidForm(jqForm) == true) {
      submitForm(jqForm);
    }
  });
  otherChoice();
});

/*
 * TODO
 * Test responsive Design
 * Docs
 */
