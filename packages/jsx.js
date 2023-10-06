export const jsx = (tag, props, ...children) => {
  if (children && children.length > 0 && typeof children[0][0] === "object") {
    children = children[0];
  }

  if (typeof tag === "string") {
    return { tag, props, children };
  }

  if (typeof tag === "function") {
    return { children };
  }

  tag.effectIndex = 0;
  return tag.render({ ...props, children }, children);
};
