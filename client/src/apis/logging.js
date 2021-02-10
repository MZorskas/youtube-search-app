import axios from 'axios';

const port = process.env.PORT || 3000;

export default axios.create({
  baseURL: `http://localhost:${port}`,
});
