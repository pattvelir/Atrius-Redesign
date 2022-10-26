export const strip = (html) => {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const checkIfDirty = (field) => {
  if (field.dataset.isDirty === "true") {
    if (field.value === field.dataset.originalValue) {
      field.dataset.isDirty = "false";
    }
  } else {
    if (field.value !== field.dataset.originalValue) {
      field.dataset.isDirty = "true";
    }
  }
  return field.dataset.isDirty;
};

// takes in a field items
// returns true or false
// adds error class to invalid fields
export const validateField = (field, elForm) => {
  let valid = true;
  const re = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*[\s]).*$/;

  switch (field.dataset.type) {
    case "email":
      valid = !!field.value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
      break;
    case "password":
      // more than eight characters
      // contains digits
      // contains lower case alpha
      // contains upper case alpha
      // contains special characters
      // does not contain white space

      valid = re.test(field.value);

      break;
    case "new-password":
      //valid password that doesnt match other password
      const passwordFields = [...elForm.querySelectorAll(".js-new-password")];

      //only return true when there are 2 new password fields
      if (passwordFields.length > 1 && passwordFields.length < 3) {
        const passwordFieldVals = passwordFields.map((field) => field.value);

        /*
                //if password fields are blank or
                //bothfields pass regex and are not
                //equal the new passwords are valid
                */

        const isBlank = passwordFieldVals.reduce((a, b) => a + b) === "";

        const notEq =
          passwordFieldVals[0] !== passwordFieldVals[1] &&
          re.test(passwordFieldVals[0]) &&
          re.test(passwordFieldVals[1]);

        valid = isBlank ? isBlank : notEq;
      } else {
        valid = false;
      }
      break;
    case "tel":
      valid = !!field.value.match(/^[0-9]*^[()-]*$/) || field.value === "";
      break;

    case "extension":
      valid = !!field.value.match(/^\d{1,4}$/) || field.value === "";
      break;

    case "zip":
      valid = !!field.value.match(
        /^[0-9]{5}$|^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
      );
      break;

    case "website":
      valid =
        !!field.value.match(
          /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
        ) || field.value === "";
      break;

    case "text-length":
      valid =
        strip(unescape(field.value)).length <
          field.getAttribute("data-max-length") || field.value === "";
      break;

    case "select":
    case "text":
    default:
      if (field.value.trim().length === 0) {
        valid = false;
      }
  }

  return valid;
};

export const handleSubmit = (
  elForm,
  handleSuccess,
  handleError,
  noJs = false,
) => {
  const url =
    elForm.getAttribute("data-post-url") || elForm.getAttribute("action");

  elForm.addEventListener("submit", (e) => {
    [...elForm.querySelectorAll(".js-form-general-error")].forEach((el) =>
      el.classList.remove("has-error"),
    );
    if (
      validFields([...elForm.querySelectorAll(".js-form-required")], elForm)
    ) {
      //submit with js
      if (noJs !== true) {
        e.preventDefault();

        if (elForm.getAttribute("method").toLowerCase() === "get") {
          elForm.submit();
          window.showLoadingOverlay();
        } else {
          [...elForm.querySelectorAll("button[type=submit]")].forEach((el) => {
            el.setAttribute("disabled", true);
            el.classList.add("is-loading");
          });

          postFormData(elForm, url, handleSuccess, handleError);
        }
      }
    } else {
      e.preventDefault();
      elForm.querySelectorAll(".has-error")[0].focus();
    }
  });
};

export const matchfields = (elForm, items) => {
  let valid = true;

  items.forEach((item) => {
    const field = item.querySelector("[aria-required]");
    const field2Match = elForm.querySelector(`[name=${field.dataset.match}]`);

    if (field === null) {
      return;
    }

    if (field2Match && field2Match.value !== field.value) {
      item.classList.add("has-error");
      valid = false;
    } else {
      item.classList.remove("has-error");
    }
  });

  return valid;
};

// takes in a node array of field items
// returns true or false
export const validFields = (items, elForm) => {
  let valid = true;

  items.forEach((item) => {
    const field = item.querySelector("[aria-required]");

    if (field === null) {
      return;
    }

    if (validateField(field, elForm)) {
      item.classList.remove("has-error");
    } else {
      item.classList.add("has-error");
      valid = false;
    }
  });

  return valid;
};

//stripped down submit handler taken from thread/forms/forms.js
//takes form el, action url, and success and error handler fns
const postFormData = (elForm, url, handleSuccess, handleError) => {
  const params = new FormData(elForm);

  fetch(url, {
    body: params,
    credentials: "same-origin",
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      handleSuccess();
    })
    .catch((err) => {
      handleError();
    });
};

export const setDefaults = (elForm) => {
  elForm
    .querySelectorAll("input:not([type=submit]), textarea, select")
    //create dataset for form fields
    .forEach((field) => {
      field.dataset.isDirty = false;
      if (field.type === "checkbox" || field.type === "radio") {
        field.dataset.checked = field.checked;
      } else {
        field.dataset.originalValue = field.value;
      }
    });
};

export const resetDefaults = (elForm) => {
  elForm
    .querySelectorAll("input:not([type=submit]), textarea, select")
    .forEach((field) => {
      field.dataset.isDirty = false;
      if (field.type === "checkbox" || field.type === "radio") {
        if (field.dataset.checked === "true") {
          field.checked = true;
        } else {
          field.checked = false;
        }
      } else {
        field.value = field.dataset.originalValue;
      }
    });
};

export const validationListeners = (item, elForm) => {
  const submitButtons = elForm.querySelectorAll("button[type=submit]");
  // const field = item.querySelector("[aria-required]");
  const field = item.querySelector(".js-form-item-field");
  const imageUpload = elForm.querySelector(".js-image-upload");
  // submitButtons.forEach(el => {
  //     el.setAttribute("disabled", true);
  // });

  if (field === null) {
    return;
  }

  if (field.dataset.type === "select") {
    field.addEventListener("change", (e) => {
      if (checkIfDirty(field)) {
        submitButtons.forEach((el) => {
          el.removeAttribute("disabled");
        });
        if (validateField(field, elForm)) {
          item.classList.remove("has-error");
        } else {
          item.classList.add("has-error");
        }
      } else {
        submitButtons.forEach((el) => {
          el.setAttribute("disabled", true);
        });
      }
    });
  } else {
    field.addEventListener("keyup", (e) => {
      if (field.getAttribute("data-type") !== "new-password") {
        if (field.dataset.isDirty === "true") {
          if (validateField(field, elForm)) {
            item.classList.remove("has-error");
          } else {
            item.classList.add("has-error");
          }
        }
      }
    });

    field.addEventListener("input", (e) => {
      if (checkIfDirty(field) === "true") {
        submitButtons.forEach((el) => {
          el.removeAttribute("disabled");
        });
      } else {
        submitButtons.forEach((el) => {
          el.setAttribute("disabled", true);
        });
      }

      if (field.getAttribute("data-type") !== "new-password") {
        if (validateField(field, elForm)) {
          item.classList.remove("has-error");
        } else {
          item.classList.add("has-error");
        }
      }
      //add dirty on blur regardless of value
      field.dataset.isDirty = "true";
    });
  }

  imageUpload.addEventListener("change", (e) => {
    if (checkIfDirty(imageUpload) === "true") {
      submitButtons.forEach((el) => {
        el.removeAttribute("disabled");
      });
    } else {
      submitButtons.forEach((el) => {
        el.setAttribute("disabled", true);
      });
    }
  });
};
