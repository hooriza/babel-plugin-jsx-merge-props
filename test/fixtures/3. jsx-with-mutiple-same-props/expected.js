"use strict";

/**
 * @mergeProps myMergeProps
 **/
function hello() {
  var props = {
    a: 2
  };
  var custom = 30;
  return <div {...myMergeProps(props, func(1, "2", 3), {
    b: 1
  }, {
    value: 1
  }, {
    className: "hello"
  }, {
    className: /10/
  }, {
    onClick: function onClick() {
      return <tag {...myMergeProps({
        a: 1
      }, {
        b: 1
      })}>text</tag>;
    }
  }, {
    custom: custom
  }, {
    gee: <span {...myMergeProps({
      className: "a"
    }, props)} />
  })}>hello</div>;
}

hiThere();
