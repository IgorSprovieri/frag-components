/** @jsx jsx */

export const jsx = (tag, props, ...children) => {
  if (typeof tag === "string") {
    return { tag, props, children };
  }

  props.children = children;
  tag.effectIndex = 0;
  return tag.render(props, children);
};
