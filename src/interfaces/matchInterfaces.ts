export interface Player {
    hero: Hero;
    position: string;
    steamAccountId: number;
    isVictory: boolean;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    award: string;
    gameMode: string;
    item0Id: number;
    item1Id: number;
    item2Id: number;
    item3Id: number;
    item4Id: number;
    item5Id: number;
}

export interface Match {
    id: number;
    players: Player[];
    gameMode: string;
}

export interface Hero {
    shortName: string;
}

export interface Item {
    id: number;
    name: string;
    displayName: string;
    image: string;
}
