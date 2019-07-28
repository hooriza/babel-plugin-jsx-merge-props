"use strict";

function hello() {
  var props = {
    a: 2
  };
  var custom = 30;
  return <div {...(true ? foo : bar)(props, func(1, "2", 3), {
    b: 1
  }, {
    value: 1
  }, {
    className: "hello"
  }, {
    className: /10/
  }, {
    onClick: function onClick() {
      return <tag {..."foo"({
        a: 1
      }, {
        b: 1
      })}>text</tag>;
    }
  }, {
    custom: custom
  }, {
    gee: <span {..."hello"({
      className: "a"
    }, props)} />
  })}>hello</div>;
}

hiThere();
