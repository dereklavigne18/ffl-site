class Team {
  /**
   * The team name
   * @type string
   */
  name;

  /**
   * The number of wins the team has
   * @type int
   */
  wins;

  /**
   * The number of losses the team has
   * @type int
   */
  losses;

  /**
   * The number of ties the team has
   * @type int
   */
  ties;

  /**
   * The number of points the team has in total
   * @type number
   */
  pointsFor;

  /**
   * The number of points scored against the team in total
   * @type number
   */
  pointsAgainst;
}

module.exports = {
  Team,
};
