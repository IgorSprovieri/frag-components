import { virtualDOM } from "./virtualDom";

export class FragComponent {
  states = {};
  effectStack = [];
  effectIndex = 0;

  effect(callback, dependencies) {
    const currentIndex = this.effectIndex;
    const stack = this.effectStack[currentIndex];

    if (!dependencies) {
      virtualDOM.effectCallbacks.push(callback);
      this.effectIndex++;
      return;
    }

    if (!stack) {
      virtualDOM.effectCallbacks.push(callback);
      this.effectStack.push(dependencies);
      this.effectIndex++;
      return;
    }

    let hasChanged = false;

    dependencies.forEach((dependence, index) => {
      if (dependence != stack[index]) {
        hasChanged = true;
      }
    });

    if (hasChanged === true) {
      virtualDOM.effectCallbacks.push(callback);
      stack[currentIndex] = dependencies;
      this.effectIndex++;
      return;
    }
  }

  setState(newSates) {
    for (const key in newSates) {
      this.states[key] = newSates[key];
    }

    virtualDOM.reRender();
  }
}
