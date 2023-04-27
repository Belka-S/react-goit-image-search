import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentDidUnMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e =>
    e.target === e.currentTarget && this.props.onClose();

  render() {
    const { children } = this.props;

    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <div>{children}</div>
      </Backdrop>,
      modalRoot
    );
  }
}
