class FragComponent {
  create(component) {
    const name = component.constructor.name;

    if (!name.match(/^[a-z]+$/)) {
      throw new Error("Name must be only string lowercase");
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
            if (!prop.match(/^[a-z]+$/)) {
              throw new Error("Props must be only string lowercase");
            }
            if (prop.includes("on")) {
              throw new Error("Props can not include 'on'");
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
          const stringId = component.script();

          const alreadyExists = document.getElementById(stringId);
          if (!alreadyExists) {
            this.createScript(stringId);
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
          this.shadowRoot.innerHTML = component.html(this.props);
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
