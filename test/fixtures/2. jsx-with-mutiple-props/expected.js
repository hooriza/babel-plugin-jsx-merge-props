"use strict";

// @mergeProps
function hello() {
  return <div {...mergeProps({
    className: "hello"
  }, {
    value: 1
  })}>hello</div>;
}

hiThere();
