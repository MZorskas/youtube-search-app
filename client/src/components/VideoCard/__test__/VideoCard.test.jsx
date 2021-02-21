import React from 'react';
import VideoCard from '../VideoCard';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

const mockLogUserData = jest.fn();
const mockSelectVideo = jest.fn();

const thumbnails = {
  medium: {
    url: 'imgURL1',
  },
  high: {
    url: 'imgURL2',
  },
};

const videoDetails = {
  author: 'author',
  authorId: 'authorId',
  title: 'title',
  description: 'description',
  videoId: 'videoId',
};

const authorSrc = `https://www.youtube.com/channel/${videoDetails.authorId}`;

const videoCardSetup = () => {
  const utils = render(
    <VideoCard
      logUserAction={mockLogUserData}
      selectVideo={mockSelectVideo}
      thumbnails={thumbnails}
      author={videoDetails.author}
      authorId={videoDetails.authorId}
      title={videoDetails.title}
      description={videoDetails.description}
      videoId={videoDetails.videoId}
    />
  );
  const author = screen.getByText(videoDetails.author);
  const title = screen.getByText(videoDetails.title);
  const videoCard = screen.getByTestId('video-card');
  const image = screen.getByTestId('video-card-image');
  return {
    author,
    title,
    videoCard,
    image,
    ...utils,
  };
};

describe('VideoCard component', () => {
  it('renders with propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('video-card')).not.toBeInTheDocument();
    render(<VideoCard thumbnails={thumbnails} />);
    expect(screen.queryByTestId('video-card')).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();
  });

  it('renders without propTypes warning', () => {
    const spy = jest.spyOn(global.console, 'error');

    expect(screen.queryByTestId('video-card')).not.toBeInTheDocument();
    render(
      <VideoCard
        logUserAction={mockLogUserData}
        selectVideo={mockSelectVideo}
        thumbnails={thumbnails}
        author={videoDetails.author}
        authorId={videoDetails.authorId}
        title={videoDetails.title}
        description={videoDetails.description}
        videoId={videoDetails.videoId}
      />
    );
    expect(screen.queryByTestId('video-card')).toBeInTheDocument();

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders with correct prop values', () => {
    const { author, title, videoCard } = videoCardSetup();
    expect(videoCard).toBeInTheDocument();
    expect(author).toBeTruthy();
    expect(title).toBeTruthy();
    expect(
      screen.getByTestId('video-card-source-1').getAttribute('srcSet')
    ).toMatch(thumbnails.medium.url);
    expect(
      screen.getByTestId('video-card-source-2').getAttribute('srcSet')
    ).toMatch(thumbnails.medium.url);

    expect(
      screen.getByTestId('video-card-source-3').getAttribute('srcSet')
    ).toMatch(thumbnails.high.url);
    expect(screen.getByAltText(videoDetails.title).getAttribute('src')).toMatch(
      thumbnails.high.url
    );
    expect(screen.getByTitle(videoDetails.author).getAttribute('href')).toBe(
      authorSrc
    );
  });

  it('selects video on title click', () => {
    const { title } = videoCardSetup();
    expect(mockSelectVideo).toHaveBeenCalledTimes(0);

    fireEvent.click(title);
    expect(mockSelectVideo).toHaveBeenCalledWith(videoDetails);
    expect(mockSelectVideo).toHaveBeenCalledTimes(1);
  });

  it('selects video on image click', () => {
    const { image } = videoCardSetup();
    expect(mockSelectVideo).toHaveBeenCalledTimes(0);

    fireEvent.click(image);
    expect(mockSelectVideo).toHaveBeenCalledWith(videoDetails);
    expect(mockSelectVideo).toHaveBeenCalledTimes(1);
  });

  it('logs user action on title click', () => {
    const { title } = videoCardSetup();
    expect(mockLogUserData).toHaveBeenCalledTimes(0);

    fireEvent.click(title);
    expect(mockLogUserData).toHaveBeenCalledTimes(1);
  });

  it('logs user action on image click', () => {
    const { image } = videoCardSetup();
    expect(mockLogUserData).toHaveBeenCalledTimes(0);

    fireEvent.click(image);
    expect(mockLogUserData).toHaveBeenCalledTimes(1);
  });

  //   it('renders with additional className', () => {
  //     expect(screen.queryByTestId('input')).not.toBeInTheDocument();
  //     render(
  //       <Input
  //         onChange={mockOnChange}
  //         className="input-test"
  //         placeholder="Gifs"
  //       />
  //     );
  //     expect(screen.getByPlaceholderText('Gifs').className).toBe(
  //       'input-wrapper__input input-test'
  //     );
  //   });
  //   it('updates input value', () => {
  //     const { input } = inputSetup();
  //     fireEvent.change(input, { target: { value: '123' } });
  //     expect(input.value).toBe('123');
  //   });
  //   it('removes input value', () => {
  //     const { input } = inputSetup();
  //     fireEvent.change(input, { target: { value: '123' } });
  //     expect(input.value).toBe('123');
  //     fireEvent.change(input, { target: { value: '' } });
  //     expect(input.value).toBe('');
  //   });
  //   it('matches snapshot', () => {
  //     const tree = renderer
  //       .create(
  //         <Input
  //           onChange={mockOnChange}
  //           className="input-test"
  //           placeholder="Gifs"
  //           id="search-input"
  //           label="Search"
  //           autoFocus
  //         />
  //       )
  //       .toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <VideoCard
          logUserAction={mockLogUserData}
          selectVideo={mockSelectVideo}
          thumbnails={thumbnails}
          author={videoDetails.author}
          authorId={videoDetails.authorId}
          title={videoDetails.title}
          description={videoDetails.description}
          videoId={videoDetails.videoId}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
