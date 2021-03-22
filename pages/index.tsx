import { wrapper } from "@/client-state/store";
import { ECMiddleware } from "@/lib/index";
import type { SesoNextApiRequest, SesoNextApiResponse } from "@/lib/types";
import Page from "@/components/page";

export const getServerSideProps = wrapper.getServerSideProps(async ({ req: _req, res: _res }) => {
  const req = (_req as unknown) as SesoNextApiRequest;
  const res = (_res as unknown) as SesoNextApiResponse;
  // Look at me. This is weird. Look at me.
  // We run middleware here - on the server - to get an execution context - on the server.
  // Otherwise, the <Page /> component is the application entry point after _app.js
  await new Promise((resolve, reject) => {
    ECMiddleware(req, res, (err) => (err ? reject(err) : resolve(null)));
  });

  return {
    props: {
      // This prop gets picked up by the HYDRATE event when the client loads.
      // See: https://github.com/kirill-konshin/next-redux-wrapper/blob/master/packages/wrapper/src/index.tsx#L165
      initialState: JSON.stringify({
        userAccount: { user: req.ec.user, enterprise: req.ec.enterprise },
      }),
    },
  };
});

export default Page;
