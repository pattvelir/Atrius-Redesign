// Handles YouTube API

export const loadScript = () => {
  if (!document.querySelector("#js-youtube-iframe-api")) {
    // If not, load the script asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "js-youtube-iframe-api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
};

export const createPlayer = (playerId, videoId, cb) => {
  return new window.YT.Player(playerId, {
    videoId,
    width: "auto",
    height: "auto",
    playerVars: {
      rel: 0,
    },
    events: {
      onReady: cb,
    },
  });
};
