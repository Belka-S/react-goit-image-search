import { Oval } from 'react-loader-spinner';
import css from 'styles/Styles.module.scss';

export const Loader = () => (
  <Oval
    height={90}
    width={90}
    color="tomato"
    wrapperClass={css.Loader}
    visible={true}
    ariaLabel="oval-loading"
    secondaryColor="tomato"
    strokeWidth={7}
    strokeWidthSecondary={7}
  />
);
