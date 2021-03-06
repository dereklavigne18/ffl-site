/**
 * TimePeriodSettings
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from 'components/Select/Loadable';
import Option from 'components/Select/Option';

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

function WeekController({
  currentWeek,
  weeks,
  shouldShowFinal,
  handleChangeWeek,
}) {
  const options = weeks.map(week => (
    <Option key={week} value={week}>
      {week.toString()}
    </Option>
  ));

  if (shouldShowFinal) {
    options.push(
      <Option key={0} value={0}>
        Final
      </Option>,
    );
  }

  return (
    <Select label="Week" defaultValue={currentWeek} onChange={handleChangeWeek}>
      {options}
    </Select>
  );
}

WeekController.propTypes = {
  currentWeek: PropTypes.number.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.number).isRequired,
  shouldShowFinal: PropTypes.bool.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

function TimePeriodSettings({
  year,
  week,
  seasons,
  handleChangeYear,
  handleChangeWeek,
}) {
  const season = seasons.find(currentSeason => currentSeason.year === year);
  const years = seasons.map(currentSeason => currentSeason.year);
  const shouldShowFinal = season.postSeasonWeeks.length > 0;

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
        shouldShowFinal={shouldShowFinal}
        handleChangeWeek={handleChangeWeek}
      />
    </div>
  );
}

TimePeriodSettings.propTypes = {
  year: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  seasons: PropTypes.array.isRequired,
  handleChangeYear: PropTypes.func.isRequired,
  handleChangeWeek: PropTypes.func.isRequired,
};

export default TimePeriodSettings;
