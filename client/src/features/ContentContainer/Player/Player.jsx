import React from 'react';
import './Player.scss';
import PropTypes from 'prop-types';

const Player = ({ selectedVideo }) => {
  const { videoId, title, description, author, authorId } = selectedVideo;

  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const authorSrc = `https://www.youtube.com/channel/${authorId}`;

  return (
    <div className="player">
      <div className="player__frame-wrapper">
        <iframe
          className="player__frame"
          src={videoSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="0"
        ></iframe>
      </div>
      <h1 className="player__title">{title}</h1>
      <div className="player__info-wrapper">
        <a href={authorSrc} className="player__author" title={author}>
          Author: {author}
        </a>
        <p className="player__description">Description: {description}</p>
      </div>
    </div>
  );
};

Player.propTypes = {
  selectedVideo: PropTypes.shape({
    videoId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    authorId: PropTypes.string,
  }),
};

export default Player;
