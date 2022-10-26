# Notice Velir Developers
This code is a customized version of Slick (https://github.com/kenwheeler/slick).

NOTE: Customizations ONLY available in `slick.js`. Do not rely on pre-baked minified code (like `slick.min.js`).

Customized lines of code are makred by a comment with `VELIR`

The following customizations were made:

  - Changed active slide from `tabindex=-1` to `tabindex=0` so it can be focused to enable keyboard nav.
  - Fixed ARIA roles for accessibility compliance inside the `initADA()` method.
    - Removed `presentation` role from dots `li`
    - Removed `tablist` role from dots container
    - removed `aria-selected` from dots li
    - removed `aria-controls` from dots li
    
    
