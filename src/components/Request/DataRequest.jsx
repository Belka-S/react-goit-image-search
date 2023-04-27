import { Component } from 'react';
import { SearchView } from './SearchView';
import { PendingView } from './PendingView';
import { ErrorView } from './ErrorView';
import * as dataAPI from 'components/Request/DataApi';

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

export class DataRequest extends Component {
  state = {
    fetchedData: null,
    error: null,
    status: IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      if (searchQuery === '') return this.setState({ status: IDLE });

      this.setState({ status: PENDING });
      dataAPI
        .fetchData(searchQuery)
        .then(data => this.setState({ fetchedData: data, status: RESOLVED }))
        .catch(error => this.setState({ error, status: REJECTED }));
    }
  }

  render() {
    const { fetchedData, error, status } = this.state;
    const { searchQuery } = this.props;

    switch (status) {
      case IDLE:
        return <span>Enter searchQuery</span>;
      case PENDING:
        return <PendingView searchQuery={searchQuery} />;
      case REJECTED:
        return <ErrorView message={error.message} />;
      case RESOLVED:
        return <SearchView fetchedData={fetchedData} />;
      default:
        break;
    }
  }
}
