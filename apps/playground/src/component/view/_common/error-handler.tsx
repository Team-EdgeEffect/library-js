import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router";

export const ErrorHandler = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  useEffect(() => {
    navigate("/error", { state: { error } });
  }, [error, navigate]);

  return null;
};
