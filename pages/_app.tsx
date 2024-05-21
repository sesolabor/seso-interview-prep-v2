import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { wrapper } from "@/client-state/store";
import { ConfigProvider } from "antd";
import "@/components/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PreventFlashOfUnstyledContent />
      <div id="root" suppressHydrationWarning>
        {typeof window === "undefined" ? null : (
          <ConfigProvider theme={{ token: { colorPrimary: "#fa541c", fontFamily: "Open Sans" } }}>
            <Component {...pageProps} />
          </ConfigProvider>
        )}
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
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAON7vpMvrepX2EQYCGhjRsEQ_X5wXdfSE&libraries=places"></script>
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