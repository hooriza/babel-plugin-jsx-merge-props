import jsx from '@babel/plugin-syntax-jsx';

const DEFAULT_MERGE_PROP_FRAG = 'mergeProps';
const extendLocation = (dst, src) =>
  Object.assign(dst, {
    start: src.start,
    end: src.end,
    loc: src.loc,
  });

module.exports = ({ types: t }) => {
  const isMergeProp = attr => t.isJSXAttribute(attr) && attr.name.name === 'merge';
  const visitor = {};

  visitor.JSXElement = (path, state) => {
    const { openingElement } = path.node;

    const mergeProp = openingElement.attributes.find(isMergeProp);
    if (!mergeProp) return;

    const mergeIdentifier = t.isJSXExpressionContainer(mergeProp.value)
      ? mergeProp.value.expression
      : mergeProp.value || extendLocation(t.identifier(DEFAULT_MERGE_PROP_FRAG), mergeProp);

    const args = openingElement.attributes
      .map(attr => {
        if (t.isJSXSpreadAttribute(attr)) return attr.argument;
        if (isMergeProp(attr)) return null;

        const { name, value } = attr;
        return extendLocation(
          t.objectExpression([
            t.objectProperty(
              t.identifier(name.name),
              t.isJSXExpressionContainer(value) ? value.expression : value || t.BooleanLiteral(true)
            ),
          ]),
          attr
        );
      })
      .filter(v => v);

    openingElement.attributes = [t.jsxSpreadAttribute(t.callExpression(mergeIdentifier, args))];
  };

  return {
    name: 'transform-react-jsx-merge-props',
    inherits: jsx,
    visitor,
  };
};
