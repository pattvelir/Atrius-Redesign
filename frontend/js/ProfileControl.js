import pell from "pell";
import $ from "jquery";

import {
  strip,
  handleSubmit,
  setDefaults,
  resetDefaults,
  checkIfDirty,
  validationListeners,
} from "./common/ThreadValidator.js";
import { countries, provinces } from "./common/data/countryProvince.js";

export class ProfileControl {
  constructor(el) {
    this.preview = document.querySelector(el);
    this.toggles = this.preview.querySelectorAll(".js-toggle");
    this.toggleBtns = this.preview.querySelectorAll(".js-toggle-btn");
    this.formDisplay = this.preview.querySelector(".js-form-display");
    if (this.formDisplay === null) {
      return false;
    }
    this.forms = this.preview.querySelectorAll(".js-profile-form");

    // for pell editor, event listeners will not work (ThreadValidator.js)
    this.profileForm = this.preview.querySelector(".js-profile-form");
    this.submitBtns = this.profileForm.querySelectorAll(".js-submit-btn");

    this.imageUploader = this.formDisplay.querySelector(".js-image-upload");
    this.imagePreview = this.formDisplay.querySelector(".js-image-preview");
    this.previewDefault = this.imagePreview.getAttribute("src");
    this.countryDropdown = this.formDisplay.querySelector(
      ".js-country-dropdown",
    );
    this.provinceDropdown = this.formDisplay.querySelector(
      ".js-province-dropdown",
    );
    this.rteEditor = this.preview.querySelector("#editor");
    this.rteWordCount = this.preview.querySelector(".js-rte-count");
    this.rteContent = this.formDisplay.querySelector(".js-rte-content");
    this.errorBoxs = this.preview.querySelectorAll(".js-error-box");
    this.init();
  }

  showMessage(status, msg) {
    [...this.errorBoxs].forEach((el) => {
      el.querySelector(".js-error-msg").innerHTML = msg;
      el.classList.remove("is-hidden");
      if (status === "error") {
        el.setAttribute("role", "alert!");
      }
    });
  }

  bindEvents() {
    [...this.toggleBtns].forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleState();
      });
    });
    //edit image
    this.imageUploader.addEventListener("change", (e) => {
      this.updatePreview(e.target);
    });
    this.countryDropdown.addEventListener("change", (e) => {
      this.updateStateProvidence(e.target.value);
    });
  }

  updatePreview(input) {
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
        this.imagePreview.setAttribute("src", e.target.result);
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

      this.imagePreview.setAttribute("src", this.previewDefault);

      return false;
    }
  }

  updateStateProvidence(country) {
    this.buildSelect(
      this.provinceDropdown,
      provinces[country],
      "Please Select State or Province",
    );
  }

  toggleState() {
    [...this.toggles].forEach((toggle) => {
      toggle.classList.toggle("is-hidden");
    });
    //reset form
    [...this.forms].forEach((elForm) => {
      resetDefaults(elForm);
    });
    this.updatePreview(this.imageUploader);
  }

  buildSelect(el, data, selectMessage) {
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

  init() {
    $(document).ready(() => {
      this.bindEvents();
      this.buildSelect(
        this.countryDropdown,
        countries,
        "Please Select Country",
      );
      this.buildSelect(
        this.provinceDropdown,
        provinces[this.countryDropdown.getAttribute("data-value") || "NA"],
        "Please Select State or Province",
      );

      // Initialize pell on an HTMLElement
      pell.init({
        element: this.rteEditor,
        onChange: (html) => {
          this.rteContent.value = unescape(html);

          // check if pell input has changed from original
          // Note: taken from validationListeners "input" listener logic
          if (checkIfDirty(this.rteContent) == "true") {
            this.submitBtns.forEach((el) => {
              el.removeAttribute("disabled");
            });
          } else {
            this.submitBtns.forEach((el) => {
              el.setAttribute("disabled", true);
            });
          }

          const remaining = 2600 - strip(html).length;
          if (remaining < 0 && !this.rteWordCount.classList.contains("error")) {
            this.rteWordCount.classList.add("error");
            this.rteEditor.classList.add("error");
          } else if (
            remaining >= 0 &&
            this.rteWordCount.classList.contains("error")
          ) {
            this.rteWordCount.classList.remove("error");
            this.rteEditor.classList.remove("error");
          }
          this.rteWordCount.innerHTML = remaining;
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

      document.querySelector(".pell-content").innerHTML =
        this.rteContent.value || "";

      [...this.forms].forEach((elForm) => {
        const elItems = elForm.querySelectorAll(".js-form-required");
        const allElItems = elForm.querySelectorAll(".js-form-item");

        setDefaults(elForm);

        const successHandler = () => {
          window.scrollTo(0, 0);
          this.toggleState();
          this.showMessage("success", "Form sumbitted successfully");
          resetDefaults(elForm);
        };

        const errorHandler = () => {
          window.scrollTo(0, 0);
          this.showMessage(
            "error",
            "Something went wrong please try again later",
          );
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
  }
}
