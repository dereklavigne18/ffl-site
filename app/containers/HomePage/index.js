/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

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
    font-family: 'Impact';
    letter-spacing: 2.25px;
    text-align: center;
    font-size: 50px;
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

const YearTitle = styled.h1`
  color: red;
  font-size: 64px;
  text-align: center;
`;

const HistorySection = styled.div`
  width: 100%;

  background-image: linear-gradient(
    to right,
    white 75%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: top;
  background-size: 20px 1px;
  background-repeat: repeat-x;

  padding-bottom: 20px;
`;

const HistoryTable = styled.table`
  width: 100%;
`;

const TableCell = styled.td`
  padding-left: 10px;
  padding-right: 10px;
`;

const ImageCell = styled(TableCell)`
  width: 50%;
  & img {
    width: auto;
    max-width: 100%;
    max-height: 500px;
  }
`;

const HistoryTitle = styled.b`
  font-family: 'Lobster', cursive;
  font-size: 40px;
`;

const ChampTitle = styled(HistoryTitle)`
  color: #a4d1a2;
`;

const LoserTitle = styled(HistoryTitle)`
  color: #f09e71;
`;

export default function HomePage() {
  // const historyComponents = historyContent.map(data => (
  //   <div className="history-block" key={data.year}>
  //     <h1>{data.year}</h1>
  //     <div className="history-split">
  //       <div className="history-card">
  //         <ChampTitle>Champion</ChampTitle>
  //         <img src={data.winnerImg} alt="champ" />
  //       </div>
  //       <div className="history-card">
  //         <b>DRAG QUEEN</b>
  //         <img src={data.loserImg} alt="loser" />
  //       </div>
  //     </div>
  //   </div>
  // ));

  const historyComponents = historyContent.map(data => (
    <HistorySection key={data.year}>
      <YearTitle>{data.year}</YearTitle>
      <HistoryTable>
        <tbody>
          <tr>
            <TableCell>
              <ChampTitle>Champion</ChampTitle>
            </TableCell>
            <TableCell>
              <LoserTitle>Drag Queen</LoserTitle>
            </TableCell>
          </tr>
          <tr>
            <ImageCell>
              <img src={data.winnerImg} alt="champ" />
            </ImageCell>
            <ImageCell>
              <img src={data.loserImg} alt="loser" />
            </ImageCell>
          </tr>
        </tbody>
      </HistoryTable>
    </HistorySection>
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
        <h2 className="history-title">FFL THROUGHOUT THE YEARS</h2>
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
    loserImg: '/dress-mac-2018.jpg',
  },
  {
    year: 2017,
    winner: 'Tommy Grip',
    loser: 'Brian Rosinski',
    winnerImg: '/mugshot-tim.jpg',
    loserImg: '/dress-roz-2017.jpg',
  },
  {
    year: 2016,
    winner: 'Ryan Sullivan',
    loser: 'Mark Daley',
    winnerImg: '/rings-sully.jpg',
    loserImg: '/dress-daley-2016-cropped.jpg',
  },
  {
    year: 2015,
    winner: 'Brian Rosinski', // Ros and sull's wins may be flipped
    loser: 'Mark Daley',
    winnerImg: '/mugshot-ros.jpg',
    loserImg: '/dress-daley-2015.jpg',
  },
];
