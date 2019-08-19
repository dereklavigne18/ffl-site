/**
 *
 * LoginModal
 *
 */

import React, { memo, createRef, useEffect } from 'react';
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
import {
  changeUsername,
  login,
  clearLoginError,
} from 'containers/LoginModal/actions';
import { closeLoginModal } from 'containers/App/actions';
import { useInjectSaga } from '../../utils/injectSaga';

const StyledModal = styled.div`
  display: block;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 75px;
  width: 100%;
  height: 100%;
  overflow-y: visible;

  & .modal-content {
    float: right;
    width: 300px;
    position: relative;

    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right: 5px;

    background-color: #38393b;
    border: 2px solid lightgrey;
    border-radius: 5px;

    overflow-y: visible;

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

  & .modal-content:before {
    content: ' ';
    position: absolute;
    display: block;
    top: -28px;
    right: 10px;
    border-width: 0 18px 28px;
    border-style: solid;
    border-color: lightgrey transparent;
  }

  & .modal-content:after {
    content: ' ';
    position: absolute;
    display: block;
    top: -24px;
    right: 14px;
    border-width: 0 14px 24px;
    border-style: solid;
    border-color: #38393b transparent;
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
`;

const Warning = styled.p`
  color: orange;
  margin-top: 5px;
  margin-bottom: 0px;
`;

function handlePageClick({ ref, handleCloseLoginModal }) {
  return evt => {
    if (!ref.current.contains(evt.target)) {
      handleCloseLoginModal();
    }
  };
}

export function LoginModal({
  username,
  isLoading,
  hasLoginError,
  handleCloseLoginModal,
  handleChangeUsername,
  handleLogin,
}) {
  useInjectReducer({ key: 'loginModal', reducer });
  useInjectSaga({ key: 'loginModal', saga });

  const ref = createRef();
  useEffect(() => {
    const handlePageClickFunc = handlePageClick({ ref, handleCloseLoginModal });
    document.addEventListener('mousedown', handlePageClickFunc, false);

    return () => {
      document.removeEventListener('mousedown', handlePageClickFunc);
    };
  });

  let content;
  if (isLoading) {
    content = <Icon className="fa fa-spinner fa-spin" />;
  } else {
    content = (
      <div>
        <p>Please enter your ESPN username</p>
        <input
          type="text"
          placeholder="ESPN Username"
          value={username}
          onChange={handleChangeUsername}
          onKeyUp={handleLogin}
        />
        {hasLoginError ? (
          <Warning>
            <Icon className="fa fa-exclamation-triangle" /> Didn&#39t recognize
            provided username
          </Warning>
        ) : null}
      </div>
    );
  }

  return (
    <StyledModal>
      <div className="modal-content" ref={ref}>
        {content}
      </div>
    </StyledModal>
  );
}

LoginModal.propTypes = {
  username: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasLoginError: PropTypes.bool.isRequired,
  handleCloseLoginModal: PropTypes.func.isRequired,
  handleChangeUsername: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  isLoading: makeSelectIsLoading(),
  hasLoginError: makeSelectHasLoginError(),
});

function handleCloseLoginModalCreator(dispatch) {
  return () => {
    dispatch(closeLoginModal());
    dispatch(clearLoginError());
  };
}

function handleChangeUsernameCreator(dispatch) {
  return evt => {
    dispatch(changeUsername({ username: evt.target.value }));
  };
}

function handleLoginCreator(dispatch) {
  return evt => {
    if (evt.keyCode === 13) {
      dispatch(login());
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCloseLoginModal: handleCloseLoginModalCreator(dispatch),
    handleChangeUsername: handleChangeUsernameCreator(dispatch),
    handleLogin: handleLoginCreator(dispatch),
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
