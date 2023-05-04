import { Formik, Form, Field } from 'formik';
import { BsSearch } from 'react-icons/bs';
import css from 'styles/Styles.module.scss';

export const FormSearch = ({ handleSubmit }) => (
  <Formik
    initialValues={{ searchQuery: '' }}
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
      <button type="submit" className={css['SearchForm-button']}>
        <BsSearch size={20} />
      </button>
    </Form>
  </Formik>
);
