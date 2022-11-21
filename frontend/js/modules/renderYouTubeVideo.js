import React, { Suspense } from "react";
import ReactDom from "react-dom";
import "../components/YouTubeVideo/youtube-video.scss";

const YouTubeVideoApp = React.lazy(() =>
  import("../components/YouTubeVideo/YouTubeVideoApp.jsx"),
);

export default (mount) => {
  const dataModel = JSON.parse(mount.dataset.model);
  ReactDom.render(
    <Suspense fallback={<p>Loading...</p>}>
      <YouTubeVideoApp {...dataModel} />
    </Suspense>,
    mount,
  );
};
