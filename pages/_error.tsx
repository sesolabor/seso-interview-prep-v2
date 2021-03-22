import { NextPageContext } from "next";
import Error, { ErrorProps } from "next/error";
import React from "react";

interface ErrorPageProps extends ErrorProps {
  isSSRReadyToRender?: boolean;
}
const ErrorPage = (props) => {
  const { statusCode, children = null } = props;

  return (
    <>
      {
        // Render the children if provided, or return the native Error component from Next
        children ? children : <Error statusCode={statusCode} />
      }
    </>
  );
};

ErrorPage.getInitialProps = async (props: NextPageContext): Promise<any> => {
  const { res, err, asPath } = props;

  const errorInitialProps: ErrorPageProps = await Error.getInitialProps({
    res,
    err,
  } as NextPageContext);

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when getInitialProps has run
  errorInitialProps.isSSRReadyToRender = true;

  if (res) {
    // Running on the server, the response object is available.
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      return { statusCode: 404, isSSRReadyToRender: true };
    }

    if (err) {
      return errorInitialProps;
    }
  } else {
    // Running on the client (browser).
    // Next.js will provide an err if:
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      return errorInitialProps;
    }
  }

  return errorInitialProps;
};

export default ErrorPage;
