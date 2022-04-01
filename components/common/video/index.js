import { useEffect } from "react"
import useGetPlatForm from "@/hooks/useGetPlatForm"
import load from '@/public/images/load.png'
import styled from "@emotion/styled"

const lazyVideo = () => {
  const lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }
          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
}

function Video({ src, poster, width, height, autoPlay, muted, preload, controls, loop, style }) {

  useEffect(() => {
    const ua = useGetPlatForm()
    if (ua === 'mobile') {
      const video = document.querySelector('#videoCom')
      videoMethod(video)
    }
  }, [])

  useEffect(() => {
    lazyVideo()
  }, [])

  // 自动播放视频
  const videoMethod = (video) => {
    video.addEventListener('touchstart', function () {
      video.play()
    })

    setTimeout(function () { video.play() }, 2000)

    video.addEventListener('ended', function (e) {
      video.play()
    })
  }

  const Video = styled.video({
    width: width ?? '100%',
    height: height ?? '100%',
    objectFit: 'contain',
    ...style
  })

  return (
    <Video
      id="videoCom"
      className="lazy"
      custom-attribute="some-value"
      poster={poster ?? load}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload={preload}
      playsInline
      webkit-playsinline="true"
      x5-video-player-type='h5'
      x5-video-player-fullscreen='true'
      x5-video-orientation="portraint"
      controls={controls}
    >
      <source data-src={src} type="video/mp4"></source>
    </Video>
  )
}

Video.defaultProps = {
  autoPlay: false,
  muted: false,
  loop: false,
  controls: false,
  preload: 'none'
}

export default Video