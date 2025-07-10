# {project-name}

- {project-description}

# Created by [@edge-effect/common-cli](https://github.com/Team-EdgeEffect/library-js/tree/main/packages/common-cli) create-package --type="lib"

This template is set up with minimal additional settings for Vite-based(npm create vite@7.0.0 {name} -- --template react-swc-ts) package development.

## How to provide styles?

### 1) CSS-in-JS based

- Generally, package developers don't need any additional configuration for this approach.
- Note: Package bundle optimization may require additional settings (e.g., dependencies configuration, external libraries).

### 2) Stylesheet based (CSS Modules, Vanilla Extract, etc.)

- When providing styles in this format, ensure the stylesheet is treated as a module and packaged in the output (dist).
- Configure the CSS file as an entry point in package.json as follows:

```json
{
  ...
  "exports": {
    ...
    "./style.css": "./dist/{package-name}.css"
  },
  ...
}
```

- After package deployment, guide users to import the styles appropriately:

```javascript
// import the package
import { Component } from "{package-name}";

// import the styles
import "{package-name}/style.css";
```

- In this example, we show how users can directly import CSS files. You can also modify the Vite config to use different approaches.
