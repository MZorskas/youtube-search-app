import React, { useState, useEffect } from 'react';
import './Search.scss';
import { inputRegex } from 'utils/regex';
import IconButton from 'components/IconButton';
import { SearchIcon } from 'assets/icons';
import PropTypes from 'prop-types';
import { LOGGER_ACTIONS } from 'loggerActions';
import classNames from 'classnames';

const Search = ({ handleSearch, logUserAction }) => {
  const [inputValue, setInputValue] = useState();
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setValidationError('');
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setValidationError('');

    const queryDetails = {
      keywords: inputValue,
    };

    logUserAction(LOGGER_ACTIONS.SEARCH, queryDetails);

    if (!inputValue) return setValidationError('Input should not be empty');

    if (inputValue.length > 20)
      return setValidationError(
        'Input should not be longer than 20 characters'
      );

    if (!inputRegex.test(inputValue))
      return setValidationError('Input should only contain letters');

    handleSearch(inputValue);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className={classNames('search__input', {
            'search__input--error': validationError,
          })}
          onChange={handleChange}
          placeholder="Search all the GIF's"
          autoFocus
        />
        <IconButton
          className="search__button"
          icon={<SearchIcon className="search__icon" />}
          type="submit"
        />
      </form>
      {validationError && (
        <p className="search__validation-error">{validationError}</p>
      )}
    </section>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  logUserAction: PropTypes.func.isRequired,
};

export default Search;
