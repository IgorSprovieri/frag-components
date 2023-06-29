class FragComponent {
  create(component) {
    const name = component?.name || component.constructor.name;
    if (!name.match(/^[a-z]+(-[a-z]+)*$/)) {
      throw new Error(
        `Invalid component name: ${name}
        \n- The name must be only lowercase
        \n- The only special character accepted is -`
      );
    }

    window.customElements.define(
      `app-${name}`,
      class extends HTMLElement {
        static get observedAttributes() {
          const props = component.props;
          if (props.includes("children")) {
            throw new Error("Children is read-only");
          }

          props.forEach((prop, index) => {
            if (
              !prop.match(/^[a-z]+$/) ||
              prop.includes("on") ||
              prop.length === 0
            ) {
              throw new Error(
                `Invalid props name: ${prop}
                \n- Props name accept only lowercase
                \n- Props name can't include on
                \n- Props name can't be ""`
              );
            }

            props[index] = props[index].toString();
          });

          return props;
        }

        constructor() {
          super();
          this.attachShadow({ mode: "open" });

          this.props = {};
          this.props.children = this.innerHTML;

          component.props.forEach((name) => {
            this.props[name] = this.getAttribute(name);
          });
        }

        connectedCallback() {
          const scriptExists = component?.script;
          if (scriptExists) {
            const stringId = component?.script();
            if (!stringId) {
              throw new Error(
                `Script on component ${name} require to return a string unique id`
              );
            }

            const alreadyExists = document.getElementById(stringId);
            if (!alreadyExists) {
              this.createScript(stringId);
            }
          }

          this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
          this.props[name] = newValue;
          this.shadowRoot.innerHTML = component.html(this.props);
        }

        disconnectedCallback() {
          this.getAttributeNames().forEach((name) => {
            this.props[name] = this.getAttribute(name);
          });
        }

        render() {
          const innerHTML = component.html(this.props);
          if (!this.validateHtml(innerHTML)) {
            throw new Error(`Component ${name} don't return a valid Html`);
          }

          this.shadowRoot.innerHTML =
            `<link rel="stylesheet" href="${component?.style}" />` + innerHTML;
        }

        validateHtml(str) {
          const doc = new DOMParser().parseFromString(str, "text/html");
          return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1
          );
        }

        createScript(id) {
          const stringScript = component.script.toString();
          const script = document.createElement("script");

          script.id = id;
          script.innerHTML = stringScript.substring(
            stringScript.indexOf("\n"),
            stringScript.lastIndexOf("return")
          );

          document.head.appendChild(script);
        }
      }
    );
  }
}

const components = [];

export const addFragComponent = (component) => {
  components.push(component);
};

export const addFragComponents = (componentList) => {
  componentList.forEach((component) => {
    components.push(component);
  });
};

export const createFragComponents = () => {
  components.forEach((component) => {
    if (component.script) {
      const scriptId = component?.script() || "";
      if (scriptId?.length === 0) {
        throw new Error("Script must return a unique id");
      }

      const alreadyExists = document.getElementById(component.script());
      if (alreadyExists) {
        throw new Error("Script id already in use");
      }
    }

    const fragComponent = new FragComponent();
    fragComponent.create(component);
  });
};
