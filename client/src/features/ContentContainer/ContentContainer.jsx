import React, { useState, useEffect } from 'react';
import './ContentContainer.scss';
import PropTypes from 'prop-types';
import Results from './Results';
import Player from './Player';

const ContentContainer = ({
  searchValue,
  videos,
  fetchData,
  isLoading,
  logUserAction,
  nextPageToken,
  error,
}) => {
  const [selectedVideo, setSelectedVideo] = useState();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedVideo]);

  useEffect(() => {
    setSelectedVideo(null);
  }, [searchValue]);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="content-container">
      {selectedVideo && <Player selectedVideo={selectedVideo} />}
      <Results
        searchValue={searchValue}
        videos={videos}
        selectVideo={selectVideo}
        fetchData={fetchData}
        isLoading={isLoading}
        logUserAction={logUserAction}
        nextPageToken={nextPageToken}
        error={error}
      />
    </div>
  );
};

ContentContainer.propTypes = {
  searchValue: PropTypes.string.isRequired,
  videos: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logUserAction: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
  error: PropTypes.string,
};

export default ContentContainer;
