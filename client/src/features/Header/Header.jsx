import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import Search from 'features/Search';

const Header = ({ handleSearch, logUserAction }) => {
  return (
    <header className="header">
      <h1 className="header__title">Youtube search app</h1>
      <Search handleSearch={handleSearch} logUserAction={logUserAction} />
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  logUserAction: PropTypes.func.isRequired,
};

export default Header;
