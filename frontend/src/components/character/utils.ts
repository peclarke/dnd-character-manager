export const basicCharacter: Character = {
    name: "FName LName",
    class: "Class / Position / Job",
    level: "1",
    avatar: "",
    race: "Race",
    notes: "",
    desc: "Description",
    pinned: false,
    uid: "",
    session: 1
}

export const getSession = () => {
    const session = localStorage.getItem("activeSession");
    if (session) return parseInt(session);
    return 1;
}