import Logo_aa from "../assets/teams/logo_aa.png";
import Logo_bb from "../assets/teams/logo_bb.png";
import Logo_centurions from "../assets/teams/logo_centurions.png";
import Logo_cu from "../assets/teams/logo_cu.png";
import Logo_dd from "../assets/teams/logo_dd.png";
import Logo_hb_di from "../assets/teams/logo_hb+di.png";
import Logo_di_kv from "../assets/teams/logo_di+kv.png";
import Logo_di from "../assets/teams/logo_di.png";
import Logo_dirty_sox from "../assets/teams/logo_dirty-sox.png";
import Logo_fc from "../assets/teams/logo_fc.png";
import Logo_gh from "../assets/teams/logo_gh.png";
import Logo_hb from "../assets/teams/logo_hb.png";
import Logo_kv from "../assets/teams/logo_kv.png";
import Logo_st from "../assets/teams/logo_st.png";
import Logo_vm from "../assets/teams/logo_vm.png";
import Logo_vw from "../assets/teams/logo_vw.png";
import { TeamNotFoundError } from "../error/TeamNotFoundError.ts";

export type Team = {
  name: string;
  logo: string;
};

export abstract class TeamRepository {
  private static TEAMS: Team[] = [
    {
      name: "Athletics",
      logo: Logo_aa,
    },
    {
      name: "Cubs",
      logo: Logo_cu,
    },
    {
      name: "Tigers",
      logo: Logo_st,
    },
    {
      name: "Ducks",
      logo: Logo_dd,
    },
    {
      name: "Centurions",
      logo: Logo_centurions,
    },
    {
      name: "Blue Bats",
      logo: Logo_bb,
    },
    {
      name: "Bulls",
      logo: Logo_hb,
    },
    {
      name: "Bulls FT",
      logo: Logo_hb,
    },
    {
      name: "Indians",
      logo: Logo_di,
    },
    {
      name: "Cardinals",
      logo: Logo_fc,
    },
    {
      name: "Vikings",
      logo: Logo_kv,
    },
    {
      name: "Metrostars",
      logo: Logo_vm,
    },
    {
      name: "Wanderers",
      logo: Logo_vw,
    },
    {
      name: "Dirty Sox",
      logo: Logo_dirty_sox,
    },
    {
      name: "Grasshoppers",
      logo: Logo_gh,
    },
    {
      name: "Bandidos",
      logo: Logo_hb,
    },
    {
      name: "Barons",
      logo: Logo_hb,
    },
    {
      name: "Bears",
      logo: Logo_di,
    },
    {
      name: "Falcons",
      logo: Logo_fc,
    },
    {
      name: "Bulls/Indians",
      logo: Logo_hb_di,
    },
    {
      name: "Bullets",
      logo: Logo_hb,
    },
    {
      name: "Indians/Vikings",
      logo: Logo_di_kv,
    },
  ];

  public static findTeam(name: string): Team {
    const team = TeamRepository.TEAMS.find((v) => v.name === name) || {
      name: name,
      logo: "",
    };

    if (!team) {
      throw new TeamNotFoundError(name);
    }

    return team;
  }
}
