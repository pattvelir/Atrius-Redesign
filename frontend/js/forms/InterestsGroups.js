import {
  setDefaults,
  resetDefaults,
  handleSubmit,
} from "../common/ThreadValidator.js";

export class InterestsGroups {
  constructor(el) {
    this.form = el;
    this.components = this.form.querySelectorAll(".js-interests-group");
    this.interestInputs = [
      ...this.form.querySelectorAll('input[type="checkbox"]'),
      ...this.form.querySelectorAll('input[type="radio"]'),
    ];
    this.checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
    this.cancelBtns = this.form.querySelectorAll(".js-cancel-btn");
    this.submitBtns = this.form.querySelectorAll(".js-submit-btn");
    this.errorBoxs = this.form.querySelectorAll(".js-error-box");
    this.init();
  }

  bindEvents(c) {
    const selectAll = c.querySelector(".js-select-all .sc-form-item__field");
    const selectNone = c.querySelector(".js-select-none .sc-form-item__field");
    const interests = c.querySelectorAll(".js-group .sc-form-item__field");

    const areAllSelected = () => {
      const selected =
        c.querySelectorAll(".js-group .sc-form-item__field").length -
          c.querySelectorAll(".js-group .sc-form-item__field:checked")
            .length ===
        0;
      if (selectAll) {
        selectAll.checked = selected;
      }

      return selected;
    };

    if (selectAll) {
      selectAll.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        [...interests].forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
        if (selectNone) {
          selectNone.checked = false;
        }
      });
    }

    if (selectNone) {
      selectNone.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        [...interests].forEach((checkbox) => {
          checkbox.checked = !isChecked;
        });
        if (selectAll) {
          selectAll.checked = false;
        }
      });
    }

    if (interests) {
      [...interests].forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          areAllSelected();
        });
      });
    }
  }

  showMessage(status, msg) {
    [...this.errorBoxs].forEach((el) => {
      el.querySelector(".js-error-msg").innerHTML = msg;
      el.classList.remove("is-hidden");
      if (status === "error") {
        el.setAttribute("role", "alert");
      }
    });
  }

  init() {
    setDefaults(this.form);
    //set default button state
    [...this.cancelBtns, ...this.submitBtns].forEach((btn) => {
      btn.setAttribute("disabled", true);
    });

    [...this.interestInputs].forEach((input) => {
      input.addEventListener("change", () => {
        if (input.dataset.checked !== String(input.checked)) {
          [...this.cancelBtns, ...this.submitBtns].forEach((btn) => {
            btn.removeAttribute("disabled");
          });
        } else {
          [...this.cancelBtns, ...this.submitBtns].forEach((btn) => {
            btn.setAttribute("disabled", true);
          });
        }
      });
    });

    [...this.components].forEach((component) => {
      this.bindEvents(component);
    });

    //disable btns till Change

    [...this.cancelBtns].forEach((cancelBtn) => {
      //reset form
      cancelBtn.addEventListener("click", (e) => {
        resetDefaults(this.form);
      });
    });

    const successHandler = () => {
      window.scrollTo(0, 0);
      this.showMessage("success", "Form sumbitted successfully");
      resetDefaults(this.form);
    };

    const errorHandler = () => {
      window.scrollTo(0, 0);
      this.showMessage("error", "Something went wrong please try again later");
    };

    //submit handler
    // noJs TRUE submit w/o JS
    handleSubmit(this.form, successHandler, errorHandler, true);
  }
}
