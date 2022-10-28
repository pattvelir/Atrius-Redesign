// Forms with empty inputs (create profile)
// <form class="sc-form js-form" action="apiUrl">
import {
  setDefaults,
  matchfields,
  validationListeners,
  handleSubmit,
} from "../../common/ThreadValidator.js";

export default function (document = document, window = window) {
  [...document.querySelectorAll(".js-form")].forEach((elForm) => {
    const elItems = elForm.querySelectorAll(".js-form-required");
    const matchItems = elForm.querySelectorAll(".js-form-match");
    const errorbox = elForm.querySelectorAll(".js-error-box");
    setDefaults(elForm);

    [
      ...elForm.querySelectorAll("input"),
      ...elForm.querySelectorAll("textarea"),
      ...elForm.querySelectorAll("select"),
    ].forEach((input) => {
      input.addEventListener("change", () => {
        detectChange(input);
      });
      detectChange(input);
    });

    function detectChange(input) {
      if (
        input.dataset.checked !== String(input.checked) &&
        input.dataset.originalValue !== input.value
      ) {
        [
          ...elForm.querySelectorAll(".js-cancel-btn"),
          ...elForm.querySelectorAll(".js-submit-btn"),
        ].forEach((btn) => {
          btn.removeAttribute("disabled");
        });
      } else {
        [
          ...elForm.querySelectorAll(".js-cancel-btn"),
          ...elForm.querySelectorAll(".js-submit-btn"),
        ].forEach((btn) => {
          btn.setAttribute("disabled", true);
        });
      }
    }

    //form sepecific handlers
    function resetButton(button) {
      button.classList.remove("is-loading");
      button.removeAttribute("disabled");
    }

    function showMessage(status, msg, el) {
      [...el].forEach((el) => {
        el.querySelector(".js-error-msg").innerHTML = msg;
        el.classList.remove("is-hidden");
        if (status === "error") {
          el.setAttribute("role", "alert!");
        }
      });
    }

    //handle successfull form response
    function successHandler() {
      //TODO add js-error-box code if element is in DOM
      if (!elForm.classList.contains("js-form-changes")) {
        elForm.reset();
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
      elForm.querySelectorAll(".js-form-general-success").forEach((el) => {
        el.classList.add("is-visible");
      });
      if (errorbox.length) {
        showMessage(
          "success",
          "Your changes have been successfully updated",
          errorbox,
        );
      }
    }

    //handle successfull form response
    function errorHandler() {
      const submitButtons = elForm.querySelectorAll("button[type=submit]");
      [...elForm.querySelectorAll(".js-form-general-error")].forEach((el) => {
        el.classList.add("has-error");
        el.textContent = "Server Error. Please try again";
      });
      [...submitButtons].forEach(resetButton);
      if (errorbox.length) {
        showMessage(
          "error",
          "Whoops, something went wrong please try again later.",
          errorbox,
        );
      }
    }

    [...matchItems].forEach((item) => {
      const field = item.querySelector("[aria-required]");

      if (field === null) {
        return;
      }

      if (field.dataset.type === "select") {
        field.addEventListener("change", (e) => {
          matchfields(elForm, [item]);
        });
      } else {
        field.addEventListener("keyup", (e) => {
          matchfields(elForm, [item]);
        });
      }
    });

    [...elForm.querySelectorAll(".js-cancel-btn")].forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        elForm.querySelectorAll("input").forEach((input) => {
          input.value = input.dataset.originalValue;
          if (input.checked !== undefined) {
            input.checked = input.dataset.checked;
          }
        });
      });
    });

    //form field validation
    elItems.forEach((item) => {
      validationListeners(item, elForm);
    });

    // noJs TRUE submit w/o JS
    handleSubmit(elForm, successHandler, errorHandler, true);
  });
}
