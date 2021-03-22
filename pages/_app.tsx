import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { wrapper } from "@/client-state/store";
import "@/components/global.module.less";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PreventFlashOfUnstyledContent />
      <div id="root" suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
        <style jsx global>{`
          @font-face {
            font-family: "Open Sans";
            font-display: swap;
          }
          body {
            font-family: "Open Sans", sans-serif;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: "Montserrat", sans-serif;
          }
        `}</style>
      </div>
    </>
  );
};

export default wrapper.withRedux(App);

function PreventFlashOfUnstyledContent() {
  // See: https://github.com/ant-design/ant-design/issues/16037
  const mounted = useIsMounted();
  return mounted ? null : (
    <Head>
      {/* Todo: Get this key into an env var. */}
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCr72hMS2fFyeG-LUj6RqTjQBzKhpFzKHc&libraries=places"></script>
      <style
        id="preventFlashOfUnstyledContent"
        dangerouslySetInnerHTML={{
          __html: `*, *::before, *::after { transition: none !important; }`,
        }}
      />
    </Head>
  );
}

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
