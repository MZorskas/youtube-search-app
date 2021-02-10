import React, { useRef, useState, useEffect } from 'react';
import './Results.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import VideoCard from 'components/VideoCard';
import { ReactComponent as Loader } from 'assets/ellipsis_loader.svg';
import { elementsPerPage } from 'apis/youtube';
import ErrorMessage from 'components/ErrorMessage';

const Results = ({
  className,
  searchValue,
  videos,
  selectVideo,
  fetchData,
  isLoading,
  logUserAction,
  nextPageToken,
  error,
}) => {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsInterseting] = useState(false);
  const [elementsOnPage, setElementsOnPage] = useState(0);
  const [limit, setLimit] = useState(140);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setElementsOnPage((previousValue) => previousValue + elementsPerPage);
          setIsInterseting(true);
        }
      },
      { threshold: 0.1 }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    if (searchValue && isIntersecting && elementsOnPage < limit) {
      setIsInterseting(false);
      fetchData(searchValue, nextPageToken);
      logUserAction('scroll videos', { keywords: searchValue });
    }
  }, [isIntersecting, searchValue, nextPageToken, elementsOnPage]);

  return (
    <div className={classNames('results', className)}>
      <h2 className="results__title">Results for {searchValue}</h2>
      <div className="results__container">
        {videos?.map((video, index) => {
          if (!!video?.id.videoId && videos.length === index + 1) {
            return (
              <VideoCard
                thumbnails={video.snippet.thumbnails}
                author={video.snippet.channelTitle}
                date={video.snippet.publishTime}
                title={video.snippet.title}
                authorId={video.snippet.channelId}
                videoId={video.id.videoId}
                description={video.snippet.description}
                key={index}
                selectVideo={selectVideo}
                elementRef={setElement}
                logUserAction={logUserAction}
              />
            );
          } else if (!!video?.id.videoId) {
            return (
              <VideoCard
                thumbnails={video.snippet.thumbnails}
                author={video.snippet.channelTitle}
                date={video.snippet.publishTime}
                title={video.snippet.title}
                authorId={video.snippet.channelId}
                videoId={video.id.videoId}
                description={video.snippet.description}
                key={index}
                selectVideo={selectVideo}
                logUserAction={logUserAction}
              />
            );
          }
        })}
      </div>
      {isLoading && <Loader className="results__loader" />}

      {error && !isLoading && <ErrorMessage message={error} />}
      {videos.length === 0 && !isLoading && (
        <ErrorMessage message="No results found" />
      )}
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  videos: PropTypes.array.isRequired,
  selectVideo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logUserAction: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Results;
