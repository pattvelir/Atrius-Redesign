import React, { Suspense } from "react";
import ReactDom from "react-dom";

const YouTubeVideoApp = React.lazy(() => import("./YouTubeVideoApp.jsx"));

export default (mount) => {
  const dataModel = JSON.parse(mount.dataset.model);
  ReactDom.render(
    <Suspense fallback={<p>Loading...</p>}>
      <YouTubeVideoApp {...dataModel} />
    </Suspense>,
    mount,
  );
};
