function hello() {
  const props = {a:2};
  const custom = 30;
	return (
    <div
      merge={true ? foo : bar}
      {...props}
      {...func(1, "2", 3)}
      {...{b:1}}
      value={1}
      className={"hello"}
      className={/10/}
      onClick={() => <tag merge="foo" a={1} b={1}>text</tag>}
      custom={custom}
      gee={<span merge={"hello"} className={"a"} {...props} />}
    >hello</div>
  );
}

hiThere();
