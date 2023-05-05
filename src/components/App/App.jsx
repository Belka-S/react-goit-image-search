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

// const reducer = (state, action) => ({ ...state, ...action });
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SEARCH_OPTIONS':
      return {
        ...state,
        searchOptions: { ...state.searchOptions, ...payload },
      };

    case IDLE:
      return {
        searchOptions: {
          ...state.searchOptions,
          page: 1,
          ...payload,
        },
        status: IDLE,
        error: null,
        normData: [],
        pageCount: 1,
        isLastPage: false,
      };

    case PENDING:
      return { ...state, status: PENDING, error: null };

    case REJECTED:
      return { ...state, status: REJECTED, isLastPage: true, payload };

    case RESOLVED:
      return {
        ...state,
        status: RESOLVED,
        pageCount: state.pageCount + 1,
        ...payload,
      };

    default:
      throw new Error(`Unsupported action type${type}`);
  }
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    status: IDLE,
    error: null,
    normData: [],
    pageCount: 1,
    isLastPage: false,
    searchOptions: {
      searchQuery: '',
      image_type: 'all',
      orientation: 'horizontal',
      per_page: 24,
      page: 1,
    },
  });

  const { status, isLastPage, normData, pageCount } = state;
  const { searchQuery, page, per_page, image_type, orientation } =
    state.searchOptions;

  // const controller = useRef();
  useEffect(() => {
    if (searchQuery === '' || pageCount > page) return;
    const controller = new AbortController();

    async function fetch() {
      // controller.current && controller.current.abort();
      // controller.current = new AbortController();
      try {
        dispatch({ type: PENDING });
        const fetchedData = await imageAPI.fetchImage(
          { searchQuery, page, per_page, image_type, orientation },
          controller.signal
        );

        const normData = [...state.normData, ...normalize(fetchedData)];
        const isLastPage = fetchedData.length === 0;

        dispatch({ type: RESOLVED, payload: { isLastPage, normData } });
        isLastPage ? notifyEnd(normData.length) : notifyOk(normData.length);
      } catch (error) {
        dispatch({ type: REJECTED, payload: error });
        normData[0] && notifyEnd(normData.length);
      }
    }
    fetch();

    return () => {
      controller.abort();
    };
  }, [
    image_type,
    normData,
    orientation,
    page,
    pageCount,
    per_page,
    searchQuery,
    state.normData,
  ]);

  const handleSubmit = ({ searchQuery }) =>
    dispatch({ type: IDLE, payload: { searchQuery } });

  const handleSelect = ({ value }) =>
    dispatch({ type: IDLE, payload: { searchQuery: value } });

  const handleChange = ({ value }, { name }) =>
    dispatch({ type: 'SEARCH_OPTIONS', payload: { [name]: value } });

  const handleClick = () =>
    dispatch({ type: 'SEARCH_OPTIONS', payload: { page: page + 1 } });

  return (
    <Section>
      <Searchbar
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSelect={handleSelect}
        isLoading={status === PENDING}
        searchQuery={searchQuery}
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
