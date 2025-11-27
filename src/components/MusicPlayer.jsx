import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import trendImg from "../assets/trend.png";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "bootstrap/dist/css/bootstrap.min.css";


const MusicPlayer = () => {
    const {
    currentSong,
    isPlaying,
    progress,
    currentTime,
    audioRef,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
    skipNext,
    skipPrevious,

  } = useMusicPlayer();

    const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Container
      className="music-player rounded-4 p-4 d-flex flex-column gap-4"
      style={{ width: "20vw", height: "80vh" }}
    >
      {currentSong?.audio && (
        <audio
          ref={audioRef}
          src={currentSong.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          autoPlay
        />
      )}

      <div className="song-info text-center flex-grow-1">
                <img
          className="rounded-3"
          src={currentSong?.cover || trendImg}
          alt={currentSong?.title || "Album cover"}
          style={{ maxWidth: "280px", height: "200px", objectFit: "cover" }}
        />

        <div className="description mb-4">
          <h3 className="fw-bold mb-2">
            {currentSong?.title || "Ripple Echoes"}
          </h3>
          <h5 className="text-white-50 mb-1">
            {currentSong?.artist || "Kael Fischer"}
          </h5>
          <p className="text-secondary small fw-bold">
            {currentSong?.album || "Best of 2024"} •{" "}
            {currentSong?.genre || "Electronic"}
          </p>
        </div>
        
        <div className="progress-container">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-white-50 small">
              {formatTime(currentTime)}
            </span>
            <span className="text-white-50 small">
              {duration ? `-${formatTime(duration - currentTime)}` : "0:00"}
            </span>
          </div>

          <div
            className="progress bg-secondary position-relative"
            style={{
              height: "6px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = (x / rect.width) * 100;
              handleSeek(percentage);
            }}
          >
            <ProgressBar
              now={progress || 0}
              className="bg-white"
              style={{ height: "100%" }}
            />
            <div
              className="position-absolute top-50 translate-middle"
              style={{
                left: `${progress}%`,
                width: "16px",
                height: "16px",
              }}
            >
              <div className="bg-white border border-dark rounded-circle w-100 h-100 shadow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="player-actions bg-primary rounded p-3 mt-auto">
        <div className="buttons d-flex justify-content-center align-items-center gap-4 mb-3">
          <i
            className="bx bx-repeat fs-5 cursor-pointer hover-scale"
            title="Repeat"
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="bx bx-skip-previous fs-4 cursor-pointer hover-scale"
            title="Previous"
            style={{ cursor: "pointer" }}
            onClick={skipPrevious}
          ></i>
          <i
            className={`bx ${
              isPlaying ? "bx-pause" : "bxs-right-arrow"
            } play-button bg-white text-primary rounded-circle p-3 fs-4 cursor-pointer hover-scale`}
            title={isPlaying ? "Pause" : "Play"}
            style={{ cursor: "pointer" }}
            onClick={togglePlay}
          ></i>
          <i
            className="bx bx-skip-next fs-4 cursor-pointer hover-scale"
            title="Next"
            style={{ cursor: "pointer" }}
            onClick={skipNext}
          ></i>
          <i
            className="bx bx-shuffle fs-5 cursor-pointer hover-scale"
            title="Shuffle"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div className="lyrics text-center cursor-pointer">
          <i className="bx bx-chevron-up d-block fs-6 mb-1"></i>
          <h6 className="mb-0 small fw-bold">LYRICS</h6>
        </div>

      </div>
  </Container>
  );
};
 

export default MusicPlayer;
