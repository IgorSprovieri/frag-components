# Frag Components

The perfect library to create SPA (Single Page Applications)

## For Developers

- Starting a new app using npx:

```console
  npx create-frag-app my-app
```

- Read the docs: [Frag Components Wiki for developers](https://github.com/IgorSprovieri/create-frag-app/wiki)

## Example

```js
class Button extends FragComponent {
  render(props, children) {
    return <button {...props}>{children}</button>;
  }
}

class Component extends FragComponent {
  states = { text: "abc" };
  components = {
    Btn: new Button(),
  };

  render() {
    const { Btn } = this.components;
    const { text } = this.states;

    this.effect(() => {
      console.log("Effect Called");
    }, [text]);

    return (
      <div>
        <Btn onclick={() => this.setState({ text: "Success" })}>
          Change Text
        </Btn>
        <h1>{text}</h1>
      </div>
    );
  }
}
```

## For Contributors

Frag Components is a Open Source library and you can be a contributor

1- See the Trello to know the nexts steps of the project:

[Frag Componens Trello](https://trello.com/b/t4evf4UD/frag-components-development)

2- Use the GitHub issues to report bugs and fixes:

[Frag Componens Issues](https://github.com/IgorSprovieri/frag-components/issues)

## Contributor Docs

See the Frag Components Wiki: [Frag Components Wiki for contributors](https://github.com/IgorSprovieri/frag-components/wiki)

## Getting Started

1- Clone the repo

```console
  git clone https://github.com/IgorSprovieri/frag-components.git
```
