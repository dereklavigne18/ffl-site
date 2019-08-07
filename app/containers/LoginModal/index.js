/**
 *
 * LoginModa
 *
 */

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledModal = styled.div`
  display: block;
  position: fixed;
  z-index: 2;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  & .modal-content {
    margin: auto;
    padding-left: 5px;
    border: 1px solid #888;
    width: 40%;
    background-color: #1f2021;
    border: 2px solid red;
    border-radius: 5px;
  }

  & .close {
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
  }

  & .close:hover,
  .close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
`;

function getCloseHandler({ setOpen, onLoginClose }) {
  return () => {
    setOpen(false);
    onLoginClose();
  };
}

function getChangeUsernameHandler({ setUsername }) {
  return evt => {
    setUsername(evt.target.valueOf());
  };
}

function getClickSubmitHandler({ handleClose }) {
  return () => {
    handleClose();
  };
}

export function LoginModal({ onLoginClose }) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const handleClose = getCloseHandler({ setOpen, onLoginClose });
  const handleChangeUsername = getChangeUsernameHandler({ setUsername });
  const handleClickSubmit = getClickSubmitHandler({ handleClose });

  if (open) {
    return (
      <StyledModal>
        <div className="modal-content">
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <span
            className="close"
            role="button"
            onClick={handleClose}
            onKeyUp={handleClose}
          >
            &times;
          </span>
          <label htmlFor="username">Username</label>
          <input type="text" value={username} onChange={handleChangeUsername} />
          <button type="submit" onClick={handleClickSubmit}>
            Log In
          </button>
        </div>
      </StyledModal>
    );
  }

  return null;
}

LoginModal.propTypes = {
  onLoginClose: PropTypes.func.isRequired,
};

export default memo(LoginModal);
