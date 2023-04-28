import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BsSearch } from 'react-icons/bs';
import css from 'styles/Styles.module.scss';

export const Searchbar = ({ handleSubmit }) => (
  <header className={css.Searchbar}>
    <Formik
      initialValues={{ searchQuery: '' }}
      validate={values => {}}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
      }}
    >
      <Form className={css.SearchForm}>
        <Field
          name="searchQuery"
          className={css['SearchForm-input']}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <ErrorMessage name="email" component="div" />
        <button type="submit" className={css['SearchForm-button']}>
          <BsSearch size={20} />
        </button>
      </Form>
    </Formik>
  </header>
);

Searchbar.propTypes = { handleSubmit: PropTypes.func.isRequired };
