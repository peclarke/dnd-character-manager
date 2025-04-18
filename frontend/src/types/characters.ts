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
    uid: number;
    session: number;
}

export type CharacterView = {
    data: RootCharacter;
}

export type Campaign = {
    cid: string;
    dmUuid: number;
    name: string;
    sessions: number;
    playerUuids: number[];
    characters: RootCharacter[];
}