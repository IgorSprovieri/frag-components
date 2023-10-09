import { cleanKeyStack } from "./jsx";

class VirtualDOM {
  app;
  effectCallbacks = [];

  flushEffects() {
    this.effectCallbacks.forEach((callback) => {
      const cleanUp = callback();

      if (cleanUp) {
        cleanUp();
      }
    });

    this.effectCallbacks.length = 0;
  }

  createElement(component) {
    const element = document.createElement(component?.tag);

    for (const key in component?.props) {
      if (key?.includes("on")) {
        element.addEventListener(
          key.split("on")[1].toLowerCase(),
          component?.props[key]
        );
      } else {
        element.setAttribute(key, component?.props[key]);
      }
    }

    component?.children?.forEach((child) => {
      if (typeof child[0] === "string") {
        element.innerHTML = element.innerHTML + child;
        return;
      }

      element.appendChild(this.createElement(child));
    });

    return element;
  }

  render(app) {
    this.app = app;

    this.app.effectIndex = 0;

    document.body.appendChild(this.createElement(app.render()));

    this.flushEffects();

    cleanKeyStack();
  }

  reRender() {
    const activeElement = document.activeElement;
    const activeElementId = activeElement ? activeElement.id : null;
    let selectionStart, selectionEnd;

    if (activeElement && activeElement.tagName === "INPUT") {
      selectionStart = activeElement.selectionStart;
      selectionEnd = activeElement.selectionEnd;
    }

    this.app.effectIndex = 0;

    document.body.replaceChildren(this.createElement(this.app.render()));

    this.flushEffects();

    cleanKeyStack();

    if (activeElementId) {
      const elementToRefocus = document.getElementById(activeElementId);
      if (elementToRefocus) {
        elementToRefocus.focus();
        if (elementToRefocus.tagName === "INPUT") {
          elementToRefocus.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }
  }
}

export const virtualDOM = new VirtualDOM();
