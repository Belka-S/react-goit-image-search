import { Component } from 'react';

import { Section } from 'components/Section/Section';

export class App extends Component {
  // ---------------State--------------- //
  state = {};

  // ---------LifeCycle Methods--------- //
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  // -----------Custom Methods---------- //

  // ------------Render Method------------ //
  render() {
    return <Section mainTitle="React Template"></Section>;
  }
}
