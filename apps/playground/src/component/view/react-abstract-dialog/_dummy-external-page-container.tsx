import "@/resource/css/dialog-sample-style.css";

import { Link } from "react-router";

const DummyExternalPageContainer = () => {
  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js/tree/main/packages/react-abstract-dialog">
          @edge-effect/react-abstract-dialog
        </Link>
      </h1>
      <ul>
        <li>
          <h2>외부 페이지로 이동 되었습니다.</h2>
        </li>
      </ul>
    </>
  );
};

export default DummyExternalPageContainer;
