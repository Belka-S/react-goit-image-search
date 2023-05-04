import PropTypes from 'prop-types';
import {
  SelectCategory,
  SelectImageOrientation,
  SelectImageType,
  SelectPerPage,
} from './FormSelect';

import css from 'styles/Styles.module.scss';
import { FormSearch } from './FormSearch';

export const Searchbar = ({
  handleSubmit,
  handleChange,
  handleSelect,
  isLoading,
  searchQuery,
}) => {
  return (
    <header className={css.Searchbar}>
      <SelectImageType handleChange={handleChange} />
      <SelectImageOrientation handleChange={handleChange} />
      <SelectPerPage handleChange={handleChange} />
      <FormSearch handleSubmit={handleSubmit} />
      <SelectCategory
        handleSelect={handleSelect}
        isLoading={isLoading}
        searchQuery={searchQuery}
      />
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
};
