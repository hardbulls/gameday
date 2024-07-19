export class TeamNotFoundError extends Error {
  constructor(team: string) {
    super(`Team "${team} was not found.`);
  }
}
