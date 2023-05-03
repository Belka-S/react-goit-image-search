import { useReducer, useEffect } from 'react';

import { Section } from 'components/Section/Section';
import { Searchbar } from 'components/Searchbar/Searchbar';
import * as imageAPI from 'services/image-api';
import { normalize } from 'services/normalize';
import { Gallery } from 'components/Gallery/Gallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Toast, notifyOk, notifyEnd } from 'components/Toast/Toast';

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

const reducer = (state, action) => ({ ...state, ...action });

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    status: IDLE,
    error: null,
    searchQuery: '',
    normData: [],
    page: 1,
    pageCount: 1,
    isLastPage: false,
  });
  const { searchQuery, page, status, isLastPage, normData, pageCount } = state;

  useEffect(() => {
    if (searchQuery === '' || pageCount > page) return;

    async function foo() {
      try {
        dispatch({ status: PENDING, error: null });
        const fetchedData = await imageAPI.fetchImage(searchQuery, page);
        const normData = [...state.normData, ...normalize(fetchedData)];

        fetchedData.length > 0
          ? notifyOk(normData.length)
          : notifyEnd(normData.length);

        dispatch({
          status: RESOLVED,
          isLastPage: fetchedData.length === 0,
          pageCount: pageCount + 1,
          normData,
        });
      } catch (error) {
        dispatch({ error, status: REJECTED, isLastPage: true });
        normData[0] && notifyEnd(normData.length);
      }
    }
    foo();
  }, [searchQuery, page, normData, state.normData, pageCount]);

  const handleSubmit = ({ searchQuery }) => {
    dispatch({
      status: IDLE,
      error: null,
      searchQuery,
      normData: [],
      page: 1,
      pageCount: 1,
      isLastPage: false,
    });
  };

  const handleClick = () => dispatch({ page: state.page + 1 });

  return (
    <Section>
      <Searchbar handleSubmit={handleSubmit} />
      <Gallery normData={normData} />
      {status === PENDING && <Loader />}
      {!isLastPage && status === RESOLVED && (
        <Button handleClick={handleClick} />
      )}
      <Toast />
    </Section>
  );
};
