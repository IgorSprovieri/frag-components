import { virtualDOM } from "./virtualDom";

class App {
  globalStates = {};

  setGlobalState(newSates) {
    for (const key in newSates) {
      this.states[key] = newSates[key];
    }

    virtualDOM.reRender();
  }
}

export const { globalStates, setGlobalState } = new App();
