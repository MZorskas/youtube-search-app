import React, { memo } from 'react';
import './VideoCard.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LOGGER_ACTIONS } from 'loggerActions';

const VideoCard = memo(
  ({
    thumbnails,
    title,
    author,
    authorId,
    videoId,
    selectVideo,
    description,
    elementRef,
    logUserAction,
    className,
  }) => {
    const authorSrc = `https://www.youtube.com/channel/${authorId}`;

    const handleClick = () => {
      const videoDetails = {
        videoId: videoId,
        title: title,
        description: description,
        author: author,
        authorId: authorId,
      };

      selectVideo(videoDetails);
      logUserAction(LOGGER_ACTIONS.PREVIEW, videoDetails);
    };

    return (
      <div className={classNames('video-card', className)} ref={elementRef}>
        <div className="video-card__image-wrapper" onClick={handleClick}>
          <picture>
            <source
              media="(max-width: 500px)"
              srcSet={thumbnails.medium?.url}
            />
            <source
              media="(min-width: 501px) and (max-width: 1200px)"
              srcSet={thumbnails.medium?.url}
            />
            <source media="(min-width: 1201px)" srcSet={thumbnails.high?.url} />
            <img
              src={thumbnails.high?.url}
              alt={title}
              className="video-card__image"
            />
          </picture>
        </div>
        <div className="video-card__info-wrapper">
          <h3
            className="video-card__title"
            title={title}
            onClick={handleClick}
            tabIndex="0"
          >
            {title}
          </h3>
          <a href={authorSrc} className="video-card__author" title={author}>
            {author}
          </a>
        </div>
      </div>
    );
  }
);

VideoCard.propTypes = {
  thumbnails: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selectVideo: PropTypes.func.isRequired,
  elementRef: PropTypes.func,
  logUserAction: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default VideoCard;
