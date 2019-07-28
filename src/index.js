import jsx from "@babel/plugin-syntax-jsx";

const MERGE_PROPS_ANNOTATION_REGEX = /\*?\s*@mergeProps(\s+([^\s]+))?/;
const DEFAULT_MEGER_PROPS_FRAG = 'mergeProps';

module.exports = ({ types: t }) => {
  const visitor = {};

  visitor.Program = {
    enter(path, state) {
      const { file } = state;
      let mergePropsFrag = null;

      if (file.ast.comments) {
        for (const comment of file.ast.comments) {
          const annotationMatches = MERGE_PROPS_ANNOTATION_REGEX.exec(comment.value);
          console.log('comment.value', comment.value);
          if (annotationMatches) {
            mergePropsFrag = annotationMatches[2] || DEFAULT_MEGER_PROPS_FRAG;
          }
        }
      }

      state.set('mergePropsFrag', mergePropsFrag);
    }
  };

  visitor.JSXElement = (path, state) => {
    const { openingElement } = path.node;
    const mergePropsFrag = state.get('mergePropsFrag');
    if (mergePropsFrag === null) return;

    const args = openingElement.attributes.map((attr, idx) => {
      if (t.isJSXSpreadAttribute(attr)) {
        return attr.argument;
      }

      const { name, value } = attr;
      return Object.assign({ start: attr.start, end: attr.end, loc: attr.loc }, t.objectExpression([
        t.objectProperty(
          t.identifier(name.name),
          t.isJSXExpressionContainer(value) ? value.expression : value
        )
      ]));
    });

    openingElement.attributes = [ t.jsxSpreadAttribute(t.callExpression(t.identifier(mergePropsFrag), args)) ];
  };

	return {
    name: 'transform-react-jsx-merge-props',
    inherits: jsx,
    visitor,
	};
};
