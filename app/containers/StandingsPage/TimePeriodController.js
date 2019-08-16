/**
 * TimePeriodController
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../components/Select';
import Option from '../../components/Select/Option';

function YearController({ currentYear, years, handleChangeYear }) {
  const options = years.map(year => (
    <Option key={year} value={year}>
      {year.toString()}
    </Option>
  ));

  return (
    <Select label="Year" defaultValue={currentYear} onChange={handleChangeYear}>
      {options}
    </Select>
  );
}

YearController.propTypes = {
  currentYear: PropTypes.number.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChangeYear: PropTypes.func.isRequired,
};

function WeekController({ currentWeek, weeks, handleChangeWeek }) {
  const options = weeks.map(week => (
    <Option key={week} value={week}>
      {week.toString()}
    </Option>
  ));

  return (
    <Select label="Week" defaultValue={currentWeek} onChange={handleChangeWeek}>
      {options}
    </Select>
  );
}

WeekController.propTypes = {
  currentWeek: PropTypes.number.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

function TimePeriodController({
  year,
  week,
  seasons,
  handleChangeYear,
  handleChangeWeek,
}) {
  const season = seasons.find(currentSeason => currentSeason.year === year);
  const years = seasons.map(currentSeason => currentSeason.year);

  return (
    <div>
      <YearController
        years={years}
        currentYear={year}
        handleChangeYear={handleChangeYear}
      />
      <WeekController
        weeks={season.weeks}
        currentWeek={week}
        handleChangeWeek={handleChangeWeek}
      />
    </div>
  );
}

TimePeriodController.propTypes = {
  year: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  seasons: PropTypes.array.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

export default TimePeriodController;
