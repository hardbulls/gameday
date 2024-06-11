export type Photo = {
  name: string;
  url: string;
};

export abstract class PhotoRepository {
  private static PHOTOS = [
    {
      name: "Bulls Outfielder",
      url: "bulls_1.png",
    },
    {
      name: "Bulls Battery",
      url: "bulls_2.png",
    },
    {
      name: "Bulls Pitcher",
      url: "bulls_4.png",
    },
    {
      name: "Bulls Win",
      url: "bulls_3.png",
    },
    {
      name: "Bulls Batter 1",
      url: "bulls_5.png",
    },
    {
      name: "Bulls Batter 2",
      url: "bulls_6.png",
    },
    {
      name: "Bandidos Team",
      url: "bandidos_1.png",
    },
    {
      name: "Bandidos Huddle",
      url: "bandidos_2.png",
    },
    {
      name: "Bandidas Youth Team",
      url: "bandidas_1.png",
    },
    {
      name: "Barons Team",
      url: "barons_1.png",
    },
    {
      name: "Bullets Team (1)",
      url: "bullets_1.png",
    },
    {
      name: "Bullets Team (2)",
      url: "bullets_2.png",
    },
    {
      name: "Bulls Family",
      url: "family_1.png",
    },
    {
      name: "U8 Win",
      url: "u8_1.png",
    },
    {
      name: "U10 Batter",
      url: "u10_1.png",
    },
    {
      name: "U12 Huddle",
      url: "u12_1.png",
    },
    {
      name: "U14 Runner",
      url: "u14_1.png",
    },
    {
      name: "U16 Team",
      url: "u16_1.png",
    },
    {
      name: "Glove",
      url: "glove_1.png",
    },
  ];

  public static findPhotos(): Photo[] {
    return PhotoRepository.PHOTOS;
  }
}
