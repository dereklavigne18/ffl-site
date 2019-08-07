/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

import Card from '../../components/Card';

const StyledHomePage = styled.div`
  position: relative;

  & h2 {
    font-family: 'Open Sans';
  }

  & .welcome-mat {
    border-bottom: 10px solid red;
  }

  & .history-title {
    padding-left: 15px;
  }

  & .history-block {
    background-image: linear-gradient(
      to right,
      white 75%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: top;
    background-size: 20px 1px;
    background-repeat: repeat-x;

    & .history-split {
      display: flex;

      & .history-card {
        width: 50%;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0px;
        font-family: 'Open Sans';

        & .fa-crown {
          color: gold;
        }

        & .fa-female {
          color: lightblue;
        }

        & img {
          width: 100%;
          height: auto;
        }

        & h3 {
          text-align: center;
          color: #800000;
          font-size: 24px;
        }

        & .history-player-outcome {
          list-style-type: none;
          padding-left: 10px;

          & li {
            display: inline-block;
          }
        }
      }
    }

    & h1 {
      color: red;
      font-size: 64px;
      padding-top: 10px;
      text-align: center;
    }
  }

  & .ffl-group-pic {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    width: 100%;
    max-height: 850px;
  }

  & .title {
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 40px;
    text-align: center;
    width: 60%;

    & h2 {
      font-size: 42px;
      margin-bottom: 0px;
      margin-top: 30px;
    }
  }
`;

export default function HomePage() {
  const historyComponents = historyContent.map(data => (
    <div className="history-block" key={data.year}>
      <h1>{data.year}</h1>
      <div className="history-split">
        <div className="history-card">
          <Card>
            <h3>Fame</h3>
            <ul className="history-player-outcome">
              <li>
                <b>CHAMPION:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
              </li>
              <li>
                <i className="fas fa-crown" />
              </li>
              <li>
                <p>&nbsp;&nbsp;{data.winner}</p>
              </li>
            </ul>
            <img src={data.winnerImg} alt="champ" />
          </Card>
        </div>
        <div className="history-card">
          <Card>
            <h3>Shame</h3>
            <ul className="history-player-outcome">
              <li>
                <b>DEAD LAST:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
              </li>
              <li>
                <i className="fas fa-female" />
              </li>
              <li>
                <p>&nbsp;&nbsp;{data.loser}</p>
              </li>
            </ul>
            <img src={data.loserImg} alt="loser" />
          </Card>
        </div>
      </div>
    </div>
  ));

  return (
    <StyledHomePage>
      <div className="welcome-mat">
        <img
          className="ffl-group-pic"
          src="/ffl-lineup.png"
          alt="The origin of FFL"
        />
        <div className="title">
          <h2>WELCOME TO THE HOME OF THE</h2>
          <img src="/android-chrome-192x192.png" alt="ffl" />
        </div>
      </div>
      <div>
        <h2 className="history-title">FFL Throughout the years...</h2>
        {historyComponents}
      </div>
    </StyledHomePage>
  );
}

const historyContent = [
  {
    year: 2018,
    winner: 'Adam Ciampi',
    loser: 'Andrew Wasko',
    winnerImg: '/mugshot-ciampi.jpg',
    loserImg: '',
  },
  {
    year: 2017,
    winner: 'Tommy Grip',
    loser: 'Brian Rosinski',
    winnerImg: '/mugshot-tim.jpg',
    loserImg: '',
  },
  {
    year: 2016,
    winner: 'Ryan Sullivan',
    loser: 'Mark Daley',
    winnerImg: '',
    loserImg: '',
  },
  {
    year: 2015,
    winner: 'Brian Rosinski', // Ros and sull's wins may be flipped
    loser: 'Mark Daley',
    winnerImg: '/mugshot-ros.jpg',
    loserImg: '/dress-daley-2015.jpg',
  },
];
