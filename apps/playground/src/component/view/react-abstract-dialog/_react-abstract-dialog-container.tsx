import "@/resource/css/dialog-sample-style.css";

import { Link } from "react-router";

const ReactDialogContainer = () => {
  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js/tree/main/packages/react-abstract-dialog">
          @edge-effect/react-abstract-dialog
        </Link>
      </h1>
      <ul>
        <li>
          <h2>
            <Link to="/examples/react-abstract-dialog/default">
              Default case (with default context)
            </Link>
          </h2>
        </li>
        <li>
          <h2>
            <Link to="/examples/react-abstract-dialog/custom">
              Custom case (with custom context)
            </Link>
          </h2>
        </li>
      </ul>
    </>
  );
};

export default ReactDialogContainer;
