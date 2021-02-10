import axios from 'axios';

export const elementsPerPage = 20;

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: elementsPerPage,
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
