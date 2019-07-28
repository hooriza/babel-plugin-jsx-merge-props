
"use strict";

// @mergeProps
function hello() {
  return <div {...mergeProps({
    className: "hello"
  }, {
    of: 2
  }, {
    "for": 10
  })}>hello</div>;
}

hiThere();
