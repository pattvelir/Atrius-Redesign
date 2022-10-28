import {
  setDefaults,
  resetDefaults,
  handleSubmit,
} from "../../common/ThreadValidator.js";

const InterestsGroups = (el) => {
  const form = document.querySelector(el);
  const components = form.querySelectorAll(".js-interests-group");
  const interestInputs = [
    ...form.querySelectorAll('input[type="checkbox"]'),
    ...form.querySelectorAll('input[type="radio"]'),
  ];
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const cancelBtns = form.querySelectorAll(".js-cancel-btn");
  const submitBtns = form.querySelectorAll(".js-submit-btn");
  const errorBoxs = form.querySelectorAll(".js-error-box");

  function bindEvents() {
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

  function showMessage(status, msg) {
    [...errorBoxs].forEach((el) => {
      el.querySelector(".js-error-msg").innerHTML = msg;
      el.classList.remove("is-hidden");
      if (status === "error") {
        el.setAttribute("role", "alert");
      }
    });
  }

  setDefaults(form);
  //set default button state
  [...cancelBtns, ...submitBtns].forEach((btn) => {
    btn.setAttribute("disabled", true);
  });

  [...interestInputs].forEach((input) => {
    input.addEventListener("change", () => {
      if (input.dataset.checked !== String(input.checked)) {
        [...cancelBtns, ...submitBtns].forEach((btn) => {
          btn.removeAttribute("disabled");
        });
      } else {
        [...cancelBtns, ...submitBtns].forEach((btn) => {
          btn.setAttribute("disabled", true);
        });
      }
    });
  });

  [...components].forEach((component) => {
    bindEvents(component);
  });

  //disable btns till Change

  [...cancelBtns].forEach((cancelBtn) => {
    //reset form
    cancelBtn.addEventListener("click", (e) => {
      resetDefaults(form);
    });
  });

  const successHandler = () => {
    window.scrollTo(0, 0);
    showMessage("success", "Form sumbitted successfully");
    resetDefaults(form);
  };

  const errorHandler = () => {
    window.scrollTo(0, 0);
    showMessage("error", "Something went wrong please try again later");
  };

  //submit handler
  // noJs TRUE submit w/o JS
  handleSubmit(form, successHandler, errorHandler, true);
};
export default InterestsGroups;
