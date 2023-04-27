import { Component } from 'react';

import { Section } from 'components/Section/Section';
import { FormikForm, Input, Radio, Checkbox } from 'components/Form/Form';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { IconBtn } from 'components/Button/IconBtn';
import { ReactComponent as CloseIcon } from 'img/svg/close.svg';
import { Collection } from 'components/Collection/Collection';
import collectionData from 'data/collection.json';
import { DataRequest } from 'components/Request/DataRequest';
import { SearchForm } from 'components/Request/SearchForm';

export class App extends Component {
  // ---------------State--------------- //
  state = {
    // Form
    formValue: [],
    filter: '',
    subject: '',
    agree: false,
    // Modal
    isModalOpen: false,
    // http-Request
    searchQuery: '',
  };

  // ---------LifeCycle Methods--------- //
  componentDidMount() {
    const subject = localStorage.getItem('subject');
    const agree = JSON.parse(localStorage.getItem('agree'));
    subject && this.setState({ subject });
    agree && this.setState({ agree });
  }

  componentDidUpdate(prevProps, prevState) {
    const { subject, agree } = this.state;
    prevState.subject !== subject && localStorage.setItem('subject', subject);
    prevState.agree !== agree && localStorage.setItem('agree', agree);
  }

  // -----------Custom Methods---------- //
  // FormikForm
  addFormValue = data =>
    this.setState(prevState => ({
      formValue: [...prevState.formValue, data],
    }));
  // Input (name="filter") // Radio
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  reset = () => this.setState({ filter: '' });
  // Checkbox
  handleCheckbox = e => {
    const { name, checked } = e.currentTarget;
    this.setState({ [name]: checked });
  };
  // Modal
  toggleModal = () => {
    console.log(`Toggle-try ${Date.now()}`);
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };
  // http-Request
  handleSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  // ------------Render Method------------ //
  render() {
    const { isModalOpen } = this.state;

    return (
      <>
        <Section mainTitle="React Template" />

        <Section title="Form">
          <FormikForm handleSubmit={this.addFormValue} />
          <Input
            handleChange={this.handleChange}
            inputValue={this.state.filter}
            reset={this.reset}
          />
          <Radio
            handleChange={this.handleChange}
            subject={this.state.subject}
            allSabjects={['css', 'html', 'js']}
          />
          <Checkbox
            handleCheckbox={this.handleCheckbox}
            agree={this.state.agree}
          />
        </Section>

        <Section title="Modal">
          <Button onClick={this.toggleModal}>Open Modal</Button>
          {isModalOpen && (
            <Modal onClose={this.toggleModal}>
              <h2>Modal Window</h2>
              <IconBtn onClick={this.toggleModal} aria-label="close modal">
                <CloseIcon width="15" height="15" />
              </IconBtn>
            </Modal>
          )}
        </Section>

        <Section title="Collection">
          <Collection items={collectionData} />
        </Section>

        <Section title="http-Request">
          <SearchForm onSearch={this.handleSearch} />
          <DataRequest searchQuery={this.state.searchQuery} />
        </Section>
      </>
    );
  }
}
