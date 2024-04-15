import { Game } from "./model/game.ts";
import { isPastDate, toDateString, toTimeString } from "./date.ts";

type ApiGame = {
  venue: string;
  home: string;
  away: string;
  awayScore?: number;
  homeScore?: number;
  status: "scheduled" | "finished" | "canceled";
  date: string;
  league: string;
  season: number;
};

export abstract class GamesRepository {
  private static API_URL = "https://api.hardbulls.com/api/weekly-games.json";
  private static VENUE_KEYWORDS = ["Ballpark am See", "Hard"];

  private static LEAGUE_MAPPING: { [key: string]: string | undefined } = {
    u8: "U8",
    u10: "U10",
    u12: "U12",
    u13: "U13",
    u14: "U14",
    u15: "U15",
    u16: "U16",
    llv: undefined,
    bbl: undefined,
    "2-blw": undefined,
  };

  private static NAME_MAPPING: { [key: string]: string } = {
    "Hard Bulls": "Bulls",
    "Hard Bulls Bandidos": "Bandidos",
    "Hard Bulls Bullets": "Bullets",
    "Hard Barons": "Barons",
    "Hard Bulls U8": "Bulls",
    "Hard Bulls U10": "Bulls",
    "Hard Bulls U12": "Bulls",
    "Hard Bulls U13": "Bulls",
    "Hard Bulls U14": "Bulls",
    "Hard Bulls U15": "Bulls",
    "Hard Bulls U16": "Bulls",
    "Feldkirch Cardinals U8": "Cardinals",
    "Feldkirch Cardinals U10": "Cardinals",
    "Feldkirch Cardinals U12": "Cardinals",
    "Feldkirch Cardinals U14": "Cardinals",
    "Feldkirch Cardinals U16": "Cardinals",
    "Feldkirch Cardinals 2": "Cardinals",
    "Feldkirch Cardinals 3": "Cardinals",
    "Diving Ducks Wr. Neustadt": "Ducks",
    "Vienna Wanderers": "Wanderers",
    "Vienna Metrostars": "Metrostars",
    "Schwechat Blue Bats": "Blue Bats",
    "Dornbirn Indians": "Indians",
    "Traiskirchen Grasshoppers": "Grasshoppers",
    "Dornbirn Indians Minis U8": "Indians",
    "Dornbirn Indians Kids U10": "Indians",
    "Dornbirn Little Indians U12": "Indians",
    "Dornbirn Indians Ponies U14": "Indians",
    "Dornbirn Redhawks": "Redhawks",
    "Dornbirn Legends": "Legends",
    "Dornbirn Bears": "Bears",
    "Dornbirn Indians 3": "Indians",
    "Dornbirn Indians 2": "Indians",
    "ASAK Athletics": "Athletics",
    "Dirty Sox Graz": "Dirty Sox",
    "Kufstein Vikings": "Vikings",
    "Schwaz Tigers": "Tigers",
    "Feldkirch Angry Balls": "Angy Balls",
    "Centurions Wels": "Centurions",
    "SG Indians - Vikings U16": "Indians/Vikings",
  };

  public static async findWeeklyScheduledHomeGames(): Promise<Game[]> {
    const apiGames = (await (
      await fetch(GamesRepository.API_URL)
    ).json()) as ApiGame[];
    const result: { [key: string]: Game } = {};

    for (const apiGame of apiGames) {
      const gameDateTime = new Date(apiGame.date);
      const isHomeGame = GamesRepository.VENUE_KEYWORDS.some(
        (keyword: string) => apiGame.venue.includes(keyword),
      );

      const gameDate = toDateString(gameDateTime);
      const gameIdentifier = `${apiGame.league}_${apiGame.home}_${apiGame.away}_${apiGame.venue}_${gameDate}`;
      const isFutureGame = !isPastDate(gameDateTime);

      if (apiGame.status === "scheduled" && isHomeGame && isFutureGame) {
        const existingGame = result[gameIdentifier] || undefined;
        const gameTime = toTimeString(gameDateTime);

        if (existingGame) {
          existingGame.times.push(gameTime);
          existingGame.times = existingGame.times.sort();
        } else {
          result[gameIdentifier] = {
            home: GamesRepository.transformName(apiGame.home),
            away: GamesRepository.transformName(apiGame.away),
            date: gameDate,
            times: [gameTime],
            league: GamesRepository.transformLeague(apiGame.league),
          };
        }
      }
    }

    return Object.values(result).sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }

      if (a.date < b.date) {
        return -1;
      }

      if (a.date === b.date) {
        if (a.times[0] > b.times[0]) {
          return 1;
        }

        if (a.times[0] < b.times[0]) {
          return -1;
        }
      }

      return 0;
    });
  }

  private static transformLeague(name: string): string | undefined {
    for (const [key, mapping] of Object.entries(
      GamesRepository.LEAGUE_MAPPING,
    )) {
      if (name.toLowerCase() === key.toLowerCase()) {
        return mapping;
      }
    }

    return name;
  }

  private static transformName(name: string): string {
    for (const [key, mapping] of Object.entries(GamesRepository.NAME_MAPPING)) {
      if (name.toLowerCase() === key.toLowerCase()) {
        return mapping;
      }
    }

    return name;
  }
}
