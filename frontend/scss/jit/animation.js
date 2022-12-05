module.exports = {
  "--test": "test 1s ease both",
  "--test-@": "@keyframes test {0%{opacity:0}100%{opacity:1}}",

  "--fx-fade-in": "fx-fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) both",
  "--fx-fade-in-@": "@keyframes fx-fade-in{0%{opacity:0}100%{opacity:1}}",

  "--fx-fade-in-right":
    "fx-fade-in-right .6s cubic-bezier(.39,.575,.565,1.000) forwards",
  "--fx-fade-in-right-@":
    "@keyframes fx-fade-in-right{0%{opacity:0}100%{opacity:1}}",

  "--fx-fade-out-right":
    "fx-fade-out-right .7s cubic-bezier(.25,.46,.45,.94) forwards",
  "--fx-fade-out-right-@":
    "@keyframes fx-fade-out-right{0%{transform:translateX(0);opacity:1}100%{transform:translateX(50px);opacity:0}}",
};
