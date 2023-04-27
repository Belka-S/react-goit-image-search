import { Component } from 'react';

import { Form } from 'components/Request/All.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
    isDisabled: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      const isDisabled = searchQuery.trim(' ') === '';

      this.setState({ isDisabled });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchQuery);
  };
  handleChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };
  handleReset = e => {
    this.setState({ searchQuery: '' });
    this.props.onSearch('');
  };

  render() {
    const { searchQuery, isDisabled } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <input
          name="search"
          value={searchQuery}
          onChange={this.handleChange}
        ></input>
        <button type="submit" disabled={isDisabled}>
          Search
        </button>
        <button type="button" onClick={this.handleReset} disabled={isDisabled}>
          Reset
        </button>
      </Form>
    );
  }
}
