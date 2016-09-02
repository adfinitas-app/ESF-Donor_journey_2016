function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function hideError()
{
  if ($(this).attr("type") === "radio" || $(this).attr("type") === "checkbox") {
    $("input[name='" + $(this).attr("name") + "']").parent().removeClass("error");
  } else if ($(this).hasClass("check-phone")) {
    $(this).parent().parent().removeClass("error");
  } else if ($(this).prop("tagName") === "SELECT") {
    $(this).parent().parent().removeClass("error");
  } else {
    $(this).parent().removeClass("error");
  }
  $(this).off("change");
}

function showError(elem) {
  if (elem.attr("type") === "radio" || elem.attr("type") === "checkbox") {
    $("input[name='" + elem.attr("name") + "']").parent().addClass("error");
    $("input[name='" + elem.attr("name") + "']").on("change", hideError);
  } else if (elem.prop("tagName") === "SELECT") {
    elem.parent().parent().addClass("error");
    elem.on("change", hideError);
  } else if (elem.hasClass("check-phone")) {
    elem.parent().parent().addClass("error");
    elem.on("change", hideError);
  } else {
    elem.parent().addClass("error");
    elem.on("change", hideError);
  }
}

/*
 * Take as argument :
 * - select element (not option)
 * - input[type="text"], input[type="email"]
 * - input[type="checkbox"], input[type="radio"]
*/
function isValidField(jqueryFieldSelector, allowEmpty = true) {
  var field = jqueryFieldSelector;
  var status = false;
  if (field.hasClass("other") && (field.hasClass("input-choix_multiple") ||
      field.hasClass("input-choix_unique"))) {
    if (field.is(":checked") && field.val() !== "") {
      status = true;
    }
  }
  else if (field.attr("type") === "radio" || field.attr("type") === "checkbox") {
    if (allowEmpty === true ||
	$("input[name='" + field.attr("name") + "']:checked").length > 0) {
      status = true;
    }
  } else if (field.is("select")) {
    if (field.find("option:selected").is(":disabled") === false) {
      status = true;
    }
  } else {
    if (allowEmpty && (field.val() === "" || field.val() === null)) {
      status = true;
    }
    else {
      if (field.hasClass("check-email")) {
	status = (isValidEmail(field.val()) === true);
      }
      else if (field.hasClass("check-phone")) {
	status = (field.intlTelInput("isValidNumber") === true);
      }
      else if (field.val() !== "" && field.val() !== null) {
	status = true;
      }
    }
  }
  return (status);
}

function isValidForm(jqueryFormSelector) {
  var status = true;
  $(".error").removeClass("error");
  jqueryFormSelector.find("input:not([type=submit]), select, textarea").each(function() {
    if (isValidField($(this), !$(this).prop("required")) == false) {
      showError($(this));
      status = false;
    }
  });
  return (status);
}
