const keyStack = {};
const currentKeyStack = {};

export const cleanKeyStack = () => {
  for (const key in keyStack) {
    if (!Object.hasOwnProperty.call(currentKeyStack, key)) {
      delete keyStack[key];
    }
  }
};

export const jsx = (tag, props, ...children) => {
  if (Array.isArray(children[0])) {
    children = children[0].map((child) => {
      return child;
    });
  }

  if (props !== null && typeof props === "object") {
    if (Object.keys(props).includes("key")) {
      if (!Object.keys(keyStack).includes(props["key"])) {
        keyStack[props["key"]] = new tag();
      }

      currentKeyStack[props["key"]] = keyStack[props["key"]];
      tag = keyStack[props["key"]];
    }
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
