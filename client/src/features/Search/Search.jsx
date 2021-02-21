import React, { useState, useEffect } from 'react';
import './Search.scss';
import { inputRegex } from 'utils/regex';
import IconButton from 'components/IconButton';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import { SearchIcon } from 'assets/icons';
import PropTypes from 'prop-types';
import { LOGGER_ACTIONS } from 'loggerActions';

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
    <section className="search" data-testid="search">
      <form
        className="search__form"
        aria-label="search"
        onSubmit={handleSubmit}
        data-testId="search-form"
      >
        <Input
          className="search__input"
          onChange={handleChange}
          placeholder="Videos"
          validationError={!!validationError}
          id="search-input"
          label="Search"
          autoFocus
        />
        <IconButton
          className="search__button"
          icon={<SearchIcon className="search__icon" />}
          type="submit"
        />
      </form>
      {validationError && (
        <ErrorMessage
          className="search__error-message"
          message={validationError}
        />
      )}
    </section>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  logUserAction: PropTypes.func.isRequired,
};

export default Search;
