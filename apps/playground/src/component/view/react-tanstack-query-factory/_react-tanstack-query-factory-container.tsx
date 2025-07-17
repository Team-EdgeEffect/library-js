import { useState } from "react";
import { Link } from "react-router";

import { getProduct } from "@/component/view/react-tanstack-query-factory/api/product-apis";

const ReactQueryFactoryContainer = () => {
  const [mutateResult, setMutateResult] = useState<string>();
  const [requestResult, setRequestResult] = useState<string>();

  const { data, isPending: isQueryPending } = getProduct.useQuery({
    path: { productId: "1" },
  });

  const { mutateAsync, isPending: isMutatePending } = getProduct.useMutation();

  return (
    <>
      <h1>
        <Link to="https://github.com/Team-EdgeEffect/library-js/tree/main/packages/react-tanstack-query-factory">
          @edge-effect/react-tanstack-query-factory
        </Link>
      </h1>
      <ul>
        <li>
          <h2>Query result</h2>
          {isQueryPending ? <p>loading...</p> : <p>{data?.description}</p>}
        </li>
        <li>
          <h2>Mutation result</h2>
          {isMutatePending ? <p>loading...</p> : <p>{mutateResult}</p>}
          <button
            onClick={async () => {
              try {
                const result = await mutateAsync({ path: { productId: "1" } });
                setMutateResult(result.description);
              } catch (error) {
                console.error(error);
              }
            }}>
            Do mutate
          </button>
        </li>
        <li>
          <h2>Direct API call result</h2>
          {requestResult && <p>{requestResult}</p>}
          <button
            onClick={async () => {
              try {
                const result = await getProduct.request({
                  path: { productId: "1" },
                });
                setRequestResult(result.description);
              } catch (error) {
                console.error(error);
              }
            }}>
            Call API direct
          </button>
        </li>
      </ul>
    </>
  );
};

export default ReactQueryFactoryContainer;
