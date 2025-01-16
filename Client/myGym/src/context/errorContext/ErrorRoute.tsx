import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

const CustomErrorPage = () => {
  const error = useRouteError();

  const errorMessage =
    (error as RouteError)?.statusText || (error as RouteError)?.message;

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default CustomErrorPage;
