import { Component } from 'react';

import { Section } from 'components/Section/Section';
import { Searchbar } from 'components/Searchbar/Searchbar';
import * as imageAPI from 'services/image-api';
import { normalize } from 'services/normalize';
import { Gallery } from 'components/Gallery/Gallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

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
    isModalOpen: false,
    modalImage: {},
  };

  // ---------LifeCycle Methods--------- //
  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

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
      } catch (error) {
        this.setState({ error, status: REJECTED, isLastPage: true });
      }
    }
  }

  // -----------Custom Methods---------- //
  handleSubmit = searchQuery => this.setState(searchQuery);

  handleClick = () => {
    const { page, isLastPage } = this.state;
    return this.setState(!isLastPage && { page: page + 1 });
  };

  toggleModal = modalImage => {
    console.log(`Toggle-try ${Date.now()}`);

    return this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalImage,
    }));
  };

  // -----------Render Method----------- //
  render() {
    const { status, isLastPage, normalData, isModalOpen, modalImage } =
      this.state;

    return (
      <Section>
        <Searchbar handleSubmit={this.handleSubmit} />
        <Gallery normalData={normalData} toggleModal={this.toggleModal} />
        {status === PENDING && <Loader />}
        {!isLastPage && <Button handleClick={this.handleClick} />}
        {isModalOpen && (
          <Modal toggleModal={this.toggleModal} modalImage={modalImage} />
        )}
      </Section>
    );
  }
}
