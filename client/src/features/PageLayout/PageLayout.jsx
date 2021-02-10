import React, { useState, useCallback } from 'react';
import './PageLayout.scss';
import Header from 'features/Header';
import ContentContainer from 'features/ContentContainer';
import youtube from 'apis/youtube';
import logging from 'apis/logging';

const PageLayout = () => {
  const [videos, setVideos] = useState([]);

  const [searchValue, setSearchValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [nextPageToken, setNextPageToken] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    setVideos([]);
    setNextPageToken('');
    fetchData(value);
  };

  const fetchData = useCallback(
    async (value, token = '') => {
      setIsLoading(true);
      try {
        const response = await youtube.get('/search', {
          params: {
            q: value,
            pageToken: token,
          },
        });
        setIsLoading(false);
        setVideos((previousData) => [...previousData, ...response.data.items]);
        setNextPageToken(response.data.nextPageToken);
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    },
    [setSearchValue, setVideos, setNextPageToken]
  );

  const logUserAction = useCallback(async (action, data) => {
    try {
      const response = await logging.post('/log-user-action', {
        action: action,
        data: data,
      });
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return (
    <main className="page-layout">
      <div className="page-layout__content-wrapper">
        <Header handleSearch={handleSearch} logUserAction={logUserAction} />
        {searchValue && (
          <ContentContainer
            searchValue={searchValue}
            videos={videos}
            fetchData={fetchData}
            isLoading={isLoading}
            logUserAction={logUserAction}
            nextPageToken={nextPageToken}
            error={error}
          />
        )}
      </div>
    </main>
  );
};

export default PageLayout;
