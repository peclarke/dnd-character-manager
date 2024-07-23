// only root character is stored in database
export type RootCharacter = {
    avatar: string;
    name: string;
    class: string;
    level: string;
    race: string;
    desc: string;
    notes: string;
    pinned: boolean;
    // metadata
    uid: string;
    session: number;
}

export type AppCharacter = RootCharacter & {
    // app specific
    // notes: string;
    // desc: string;
    pinned: boolean;
    uid: string;
    // session: number;
}