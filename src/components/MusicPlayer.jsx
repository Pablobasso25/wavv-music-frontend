import React from "react";
import { Container,  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const MusicPlayer = () => {
    const {
    currentSong,
    audioRef,
    handleTimeUpdate,

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

      </div>

  );
};


export default MusicPlayer;
