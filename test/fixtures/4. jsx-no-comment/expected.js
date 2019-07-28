"use strict";

function hello() {
  var props = {
    a: 2
  };
  var custom = 30;
  return <div {...props} {...func(1, "2", 3)} {...{
    b: 1
  }} value={1} className={"hello"} className={/10/} onClick={function () {
    return <tag a={1} b={1}>text</tag>;
  }} custom={custom} gee={<span className={"a"} {...props} />}>hello</div>;
}

hiThere();
