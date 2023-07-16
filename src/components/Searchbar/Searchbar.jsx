import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';
import { useState } from 'react';
//-----------------------------------------------------------------

export const Searchbar = ({ handleQuery }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    handleQuery(query);
    setQuery('');
  };
  const handleChange = evt => setQuery(evt.target.value); 

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit">
            <AiOutlineSearch className={css['SearchForm-button']} />
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder=" Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

PropTypes.Searchbar = {
  handleQuery: PropTypes.func.isRequired,
};
