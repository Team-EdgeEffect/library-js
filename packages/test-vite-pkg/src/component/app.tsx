import reactLogo from "../resource/image/react.svg";
import viteLogo from "../resource/image/vite.svg";

import "../resource/style/app.css";
import { useCounter } from "./hook/use-counter";
import { ModuleCssComponent } from "./view/module-css-component";
import { CssImportComponent } from "./view/css-import-component";

const App = () => {
  const [count, setCount] = useCounter(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CssImportComponent data="test" />
      <ModuleCssComponent />
    </>
  );
};

export default App;
