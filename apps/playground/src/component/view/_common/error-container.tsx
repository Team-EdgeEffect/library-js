import { useMemo } from "react";
import { Link, useLocation } from "react-router";

const ErrorContainer = () => {
  const { state } = useLocation();

  const { description } = useMemo(() => {
    return {
      error: state?.error,
      description: state?.error?.toString(),
    };
  }, [state?.error]);

  return (
    <>
      <h1>Error</h1>
      {description && <h2>{description}</h2>}
      <Link to="/">홈으로</Link>
    </>
  );
};

export default ErrorContainer;
