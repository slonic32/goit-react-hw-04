import css from "./SearchBar.module.css";
import { Field, Formik, Form } from "formik";

export default function SearchBar({ onSubmit }) {
  const initialValues = { filter: "" };

  function handleSubmit(values, actions) {
    onSubmit(values.filter, 1);
    actions.resetForm();
  }

  return (
    <header className={css.searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <Field
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="filter"
          />
        </Form>
      </Formik>
    </header>
  );
}
