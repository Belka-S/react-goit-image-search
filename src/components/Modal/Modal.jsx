import PropTypes from 'prop-types';
import { IconBtn } from 'components/Button/IconBtn';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from 'styles/Styles.module.scss';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = { isConnected: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentDidUnMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = e =>
    e.target === e.currentTarget && this.props.toggleModal();

  handleLoad = e => this.setState({ isConnected: e.target.isConnected });

  render() {
    const {
      toggleModal,
      modalImage: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img
            className={css.Image}
            src={largeImageURL}
            alt={tags}
            onLoad={this.handleLoad}
          />
          {this.state.isConnected && <IconBtn toggleModal={toggleModal} />}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalImage: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
