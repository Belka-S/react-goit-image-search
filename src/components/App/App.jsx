import { Component } from 'react';

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

export class App extends Component {
  // ---------------State--------------- //
  state = {
    status: IDLE,
    error: null,
    searchQuery: '',
    page: 1,
    isLastPage: true,
    normalData: [],
  };

  // ---------LifeCycle Methods--------- //
  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, normalData } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      //   this.setState({ status: PENDING, error: null });
      //   imageAPI.fetchImage(searchQuery, page).then(fetchedData => this.setState({ fetchedData, status: RESOLVED })).catch(error => this.setState({ error, status: REJECTED }));
      try {
        this.setState({ status: PENDING, error: null });
        const fetchedData = await imageAPI.fetchImage(searchQuery, page);
        const normalData = normalize(fetchedData);
        this.setState(prevState => ({
          status: RESOLVED,
          isLastPage: normalData.length === 0,
          normalData: [...prevState.normalData, ...normalData],
        }));
        normalData.length > 0
          ? notifyOk(this.state.normalData.length, normalData.length)
          : notifyEnd(this.state.normalData.length);
      } catch (error) {
        this.setState({ error, status: REJECTED, isLastPage: true });
        normalData[0] && notifyEnd(normalData.length);
      }
    }
  }

  // -----------Custom Methods---------- //
  handleSubmit = ({ searchQuery }) =>
    this.setState({ searchQuery, page: 1, normalData: [] });

  handleClick = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  // -----------Render Method----------- //
  render() {
    const { status, isLastPage, normalData } = this.state;

    return (
      <Section>
        <Searchbar handleSubmit={this.handleSubmit} />
        <Gallery normalData={normalData} />
        {status === PENDING && <Loader />}
        {!isLastPage && status === RESOLVED && (
          <Button handleClick={this.handleClick} />
        )}
        <Toast />
      </Section>
    );
  }
}
