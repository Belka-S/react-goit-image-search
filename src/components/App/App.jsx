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
    searchOptions: {
      searchQuery: '',
      image_type: 'all',
      orientation: 'horizontal',
      per_page: 24,
      page: 1,
    },
    status: IDLE,
    error: null,
    normData: [],
    pageCount: 1,
    isLastPage: false,
  });
  const {
    searchOptions: { searchQuery, page, per_page, image_type, orientation },
    status,
    isLastPage,
    normData,
    pageCount,
  } = state;
  // const controller = useRef();
  useEffect(() => {
    if (searchQuery === '' || pageCount > page) return;
    const controller = new AbortController();

    async function foo() {
      // controller.current && controller.current.abort();
      // controller.current = new AbortController();
      try {
        dispatch({ status: PENDING, error: null });
        const fetchedData = await imageAPI.fetchImage(
          { searchQuery, page, per_page, image_type, orientation },
          controller.signal
        );
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

    return () => {
      controller.abort();
    };
  }, [
    searchQuery,
    page,
    normData,
    state.normData,
    pageCount,
    per_page,
    image_type,
    orientation,
  ]);

  const handleSubmit = ({ searchQuery }) => {
    dispatch({
      searchOptions: { ...state.searchOptions, searchQuery, page: 1 },
      status: IDLE,
      error: null,
      normData: [],
      pageCount: 1,
      isLastPage: false,
    });
  };

  const handleSelect = ({ value }, { name }) =>
    dispatch({
      searchOptions: { ...state.searchOptions, searchQuery: value, page: 1 },
      status: IDLE,
      error: null,
      normData: [],
      pageCount: 1,
      isLastPage: false,
    });

  const handleChange = ({ value }, { name }) =>
    dispatch({
      searchOptions: {
        ...state.searchOptions,
        [name]: value,
      },
    });

  const handleClick = () =>
    dispatch({
      searchOptions: {
        ...state.searchOptions,
        page: state.searchOptions.page + 1,
      },
    });

  return (
    <Section>
      <Searchbar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSelect={handleSelect}
        isLoading={state.status === PENDING}
        searchQuery={state.searchOptions.searchQuery}
      />
      <Gallery normData={normData} />
      {status === PENDING && <Loader />}
      {!isLastPage && status === RESOLVED && (
        <Button handleClick={handleClick} />
      )}
      <Toast />
    </Section>
  );
};
