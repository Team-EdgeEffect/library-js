import { RouterProvider } from "react-router";

import { router } from "@/script/route/router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
