const keyStack = [];

export const jsx = (tag, props, ...children) => {
  if (Array.isArray(children[0])) {
    children = children[0].map((child) => {
      return child;
    });
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
