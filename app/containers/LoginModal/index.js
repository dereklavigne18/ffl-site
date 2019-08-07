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
  left: 0;
  top: 30%;
  width: 100%;
  height: 100%;
  overflow: auto;

  & .modal-content {
    margin: auto;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #888;
    width: 30%;
    background-color: #1f2021;
    border: 2px solid red;
    border-radius: 5px;
    overflow: scroll;

    & .username-component {
      margin: auto;
      width: 50%;

      & input {
        width: 100%;
      }

      & .submit-login {
        margin-top: 10px;
        margin-bottom: 25px;
        font-family: 'Open Sans';

        & button {
          background-color: red;
          border-radius: 2px;
          border-color: red;
          color: white;
        }
      }
    }
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
    setUsername(evt.target.value);
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
          <br />
          <div className="username-component">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            <br />
            <div className="submit-login" align="right">
              <button type="submit" onClick={handleClickSubmit}>
                Log In
              </button>
            </div>
          </div>
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
