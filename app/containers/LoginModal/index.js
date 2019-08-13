/**
 *
 * LoginModal
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';

import reducer from 'containers/LoginModal/reducer';
import saga from 'containers/LoginModal/saga';
import {
  makeSelectUsername,
  makeSelectIsLoading,
  makeSelectHasLoginError,
} from 'containers/LoginModal/selectors';
import { changeUsername, login } from 'containers/LoginModal/actions';
import { closeLoginModal } from 'containers/App/actions';
import { useInjectSaga } from '../../utils/injectSaga';

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
    background-color: #38393b;
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

const Icon = styled.i`
  color: red;
  float: left;
`;

export function LoginModal({
  username,
  isLoading,
  hasLoginError,
  onCloseLoginModal,
  onChangeUsername,
  onClickLogin,
}) {
  useInjectReducer({ key: 'loginModal', reducer });
  useInjectSaga({ key: 'loginModal', saga });

  let loginButton;
  let usernameTextbox;
  if (isLoading) {
    loginButton = (
      <button type="submit" disabled>
        <i className="fa fa-spinner fa-spin" />
      </button>
    );
    usernameTextbox = <input type="text" value={username} disabled />;
  } else {
    loginButton = (
      <button type="submit" onClick={onClickLogin}>
        Log In
      </button>
    );
    usernameTextbox = (
      <input type="text" value={username} onChange={onChangeUsername} />
    );
  }

  return (
    <StyledModal>
      <div className="modal-content">
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <span
          className="close"
          role="button"
          onClick={onCloseLoginModal}
          onKeyUp={onCloseLoginModal}
        >
          &times;
        </span>
        <br />
        <div className="username-component">
          <label htmlFor="username">Username</label>
          <br />
          {usernameTextbox}
          <br />
          <div className="submit-login" align="right">
            {hasLoginError ? (
              <Icon className="fa fa-exclamation-triangle" />
            ) : null}
            {loginButton}
          </div>
        </div>
      </div>
    </StyledModal>
  );
}

LoginModal.propTypes = {
  username: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasLoginError: PropTypes.bool.isRequired,
  onCloseLoginModal: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  isLoading: makeSelectIsLoading(),
  hasLoginError: makeSelectHasLoginError(),
});

function onCloseLoginModalCreator(dispatch) {
  return () => {
    dispatch(closeLoginModal());
  };
}

function onChangeUsernameCreator(dispatch) {
  return evt => {
    dispatch(changeUsername({ username: evt.target.value }));
  };
}

function onClickLoginCreator(dispatch) {
  return () => {
    dispatch(login());
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseLoginModal: onCloseLoginModalCreator(dispatch),
    onChangeUsername: onChangeUsernameCreator(dispatch),
    onClickLogin: onClickLoginCreator(dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginModal);
