"use strict";

function hello() {
  return <div {...mergeProps({
    className: "hello"
  }, {
    of: 2
  }, {
    "for": 10
  }, {
    bravo: true
  })}>hello</div>;
}

hiThere();
