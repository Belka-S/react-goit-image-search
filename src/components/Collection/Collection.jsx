import { PureComponent } from 'react';
import classNames from 'classnames';

import css from 'styles/Buttons.module.scss';
import { DivWrap } from './Collection.styled';

const LS_KEY = 'collection_active_item_id';

export class Collection extends PureComponent {
  // ---------------State--------------- //
  state = { activeItemId: null };

  // ---------LifeCycle Methods--------- //
  componentDidMount() {
    const activeItemId = localStorage.getItem(LS_KEY);
    activeItemId && this.setState({ activeItemId });
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeItemId } = this.state;
    if (prevState.activeItemId !== activeItemId) {
      localStorage.setItem(LS_KEY, activeItemId);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.activeItemId !== this.state.activeItemId;
  // }

  // -----------Custom Methods---------- //
  handleClick = id => {
    this.setState({ activeItemId: id });
  };

  addClass = id => {
    return classNames(css.btn, {
      [css.btn__active]: id === this.state.activeItemId,
    });
    // const currentClass = [css.btn];
    // if (id === this.state.activeItemId) {
    //   currentClass.push(css.btn__active);
    // }
    // return currentClass.join(' ');
  };

  // ------------Render Method------------ //
  render() {
    const { items } = this.props;
    const { activeItemId } = this.state;
    const activeItem = items.find(el => el.id === activeItemId);

    return (
      <DivWrap>
        <div>
          {items.map(item => (
            <button
              className={this.addClass(item.id)}
              key={item.id}
              onClick={e => this.handleClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        {activeItem && (
          <img src={activeItem.avatar} alt="icon" width="100" height="100" />
        )}
      </DivWrap>
    );
  }
}
