// import "../components/BackgroundVideo/background-video.scss";
export default (el) => {
  const backgroundVideoEl = el.querySelector(".js-background-video-el");
  const backgroundVideoButton = el.querySelector(".js-background-video-button");

  backgroundVideoButton.addEventListener("click", (e) => playPauseVideo());

  function playPauseVideo(event) {
    if (backgroundVideoEl.paused) {
      backgroundVideoEl.play();
      el.classList.add("is-playing");
    } else {
      backgroundVideoEl.pause();
      el.classList.remove("is-playing");
    }
  }
};
