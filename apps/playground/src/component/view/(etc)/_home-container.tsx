import { Link } from "react-router";

const HomeContainer = () => {
  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js">
          @edge-effect/library-js
        </Link>
      </h1>
      <h2>Playgrounds</h2>
      <ul>
        <li>
          <Link to="/examples/react-abstract-dialog">
            React abstract dialog
          </Link>
        </li>
        <li>
          <Link to="/examples/react-tanstack-query-factory">
            React tanstack query factory
          </Link>
        </li>
      </ul>
    </>
  );
};

export default HomeContainer;
