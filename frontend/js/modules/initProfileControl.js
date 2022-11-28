import pell from "pell";
import $ from "jquery";

import {
  strip,
  handleSubmit,
  setDefaults,
  resetDefaults,
  checkIfDirty,
  validationListeners,
} from "../common/ThreadValidator.js";
import { countries, provinces } from "../common/data/countryProvince.js";

const ProfileControl = (el) => {
  const preview = document.querySelector(el);
  const toggles = preview.querySelectorAll(".js-toggle");
  const toggleBtns = preview.querySelectorAll(".js-toggle-btn");
  const formDisplay = preview.querySelector(".js-form-display");
  if (formDisplay === null) {
    return false;
  }
  const forms = preview.querySelectorAll(".js-profile-form");

  // for pell editor, event listeners will not work (ThreadValidator.js)
  const profileForm = preview.querySelector(".js-profile-form");
  const submitBtns = profileForm.querySelectorAll(".js-submit-btn");

  const imageUploader = formDisplay.querySelector(".js-image-upload");
  const imagePreview = formDisplay.querySelector(".js-image-preview");
  const previewDefault = imagePreview.getAttribute("src");
  const countryDropdown = formDisplay.querySelector(".js-country-dropdown");
  const provinceDropdown = formDisplay.querySelector(".js-province-dropdown");
  const rteEditor = preview.querySelector("#editor");
  const rteWordCount = preview.querySelector(".js-rte-count");
  const rteContent = formDisplay.querySelector(".js-rte-content");
  const errorBoxs = preview.querySelectorAll(".js-error-box");

  function showMessage(status, msg) {
    [...errorBoxs].forEach((el) => {
      el.querySelector(".js-error-msg").innerHTML = msg;
      el.classList.remove("is-hidden");
      if (status === "error") {
        el.setAttribute("role", "alert!");
      }
    });
  }

  function bindEvents() {
    [...toggleBtns].forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleState();
      });
    });
    //edit image
    imageUploader.addEventListener("change", (e) => {
      updatePreview(e.target);
    });
    countryDropdown.addEventListener("change", (e) => {
      updateStateProvidence(e.target.value);
    });
  }

  function updatePreview(input) {
    const acceptedMimes = ["image/png", "image/jpeg"];
    const fileCheck = input.files[0]
      ? acceptedMimes.indexOf(input.files[0].type) !== -1
      : false;
    const parentItem = input.closest(
      ".sc-form-item:not(.sc-form-item--optional)",
    );

    if (fileCheck) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      if (parentItem.classList.contains("has-error")) {
        input
          .closest(".sc-form-item:not(.sc-form-item--optional)")
          .querySelector(".sc-form-item__error-msg")
          .classList.remove("has-error");

        parentItem.classList.remove("has-error");
      }
    } else {
      if (input.value !== "") {
        parentItem
          .querySelector(".sc-form-item__error-msg")
          .classList.add("has-error");

        parentItem.classList.add("has-error");
        input.value = "";
      }

      imagePreview.setAttribute("src", previewDefault);

      return false;
    }
  }

  function updateStateProvidence(country) {
    buildSelect(
      provinceDropdown,
      provinces[country],
      "Please Select State or Province",
    );
  }

  function toggleState() {
    [...toggles].forEach((toggle) => {
      toggle.classList.toggle("is-hidden");
    });
    //reset form
    [...forms].forEach((elForm) => {
      resetDefaults(elForm);
    });
    updatePreview(imageUploader);
  }

  function buildSelect(el, data, selectMessage) {
    const elValue = el.getAttribute("data-value");
    el.innerHTML = `<option value="">${selectMessage}</option>`;
    data.forEach((item) => {
      // const selected = item.selected === true ? "selected" : "";
      const option = document.createElement("option");
      option.value = item.value;
      option.innerHTML = item.name;
      if (item.value == elValue) {
        option.selected = "selected";
      }
      el.appendChild(option);
      if (item.selected === true) {
        el.value = item.value;
      }
    });
    el.value = el.getAttribute("data-value");
  }

  $(document).ready(() => {
    bindEvents();
    buildSelect(countryDropdown, countries, "Please Select Country");
    buildSelect(
      provinceDropdown,
      provinces[countryDropdown.getAttribute("data-value") || "NA"],
      "Please Select State or Province",
    );

    // Initialize pell on an HTMLElement
    pell.init({
      element: rteEditor,
      onChange: (html) => {
        rteContent.value = unescape(html);

        // check if pell input has changed from original
        // Note: taken from validationListeners "input" listener logic
        if (checkIfDirty(rteContent) == "true") {
          submitBtns.forEach((el) => {
            el.removeAttribute("disabled");
          });
        } else {
          submitBtns.forEach((el) => {
            el.setAttribute("disabled", true);
          });
        }

        const remaining = 2600 - strip(html).length;
        if (remaining < 0 && !rteWordCount.classList.contains("error")) {
          rteWordCount.classList.add("error");
          rteEditor.classList.add("error");
        } else if (remaining >= 0 && rteWordCount.classList.contains("error")) {
          rteWordCount.classList.remove("error");
          rteEditor.classList.remove("error");
        }
        rteWordCount.innerHTML = remaining;
      },
      defaultParagraphSeparator: "div",
      styleWithCSS: false,
      actions: ["bold", "italic", "underline", "olist", "ulist", "link"],
      classes: {
        actionbar: "pell-actionbar",
        button: "pell-button",
        content: "pell-content",
        selected: "pell-button-selected",
      },
    });

    document.querySelector(".pell-content").innerHTML = rteContent.value || "";

    [...forms].forEach((elForm) => {
      const elItems = elForm.querySelectorAll(".js-form-required");
      const allElItems = elForm.querySelectorAll(".js-form-item");

      setDefaults(elForm);

      const successHandler = () => {
        window.scrollTo(0, 0);
        toggleState();
        showMessage("success", "Form sumbitted successfully");
        resetDefaults(elForm);
      };

      const errorHandler = () => {
        window.scrollTo(0, 0);
        showMessage("error", "Something went wrong please try again later");
      };

      //form field validation
      // [...elItems].forEach(item => {
      [...allElItems].forEach((item) => {
        validationListeners(item, elForm);
      });

      // submit handler
      // noJs TRUE submit w/o JS
      handleSubmit(elForm, successHandler, errorHandler, true);
    });
  });
};

export default ProfileControl;
