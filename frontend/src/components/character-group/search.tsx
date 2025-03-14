import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RootCharacter } from "../../types/characters";
import { useStoreState } from "../../store/hooks";

const SearchBar = () => {
    const characters = useStoreState(state => state.characters);

    const [val, setVal] = useState<string>("");

    const filterByName = () => {
        return characters.filter(ch => ch.name.toLowerCase().includes(val.toLowerCase()))
    }

    const filterByNotes = () => {
        return characters.filter(ch => ch.notes.includes(val));
    }

    const filterByRace = () => {
        return characters.filter(ch => ch.race.includes(val));
    }

    const filterByClass = () => {
        return characters.filter(ch => ch.class.includes(val));
    }

    const [filters, _setFilters] = useState([filterByName, filterByNotes, filterByRace, filterByClass]);

    const stop  = new Event("stopSearch");

    useEffect(() => {
        if (val === "") {
            document.dispatchEvent(stop);
        }
    }, [val])

    const onChange = (newValue: string) => {
        setVal(newValue);

        const allChs: RootCharacter[] = [];
        const filts: (() => RootCharacter[])[] = [];
        characters.forEach(ch => allChs.push(ch));
        filters.forEach(f => filts.push(f));

        const res = filterAll([filterByName]);

        const start = new CustomEvent("startSearch", { detail: { characters: res } });
        document.dispatchEvent(start);

    }

    const filterAll = (filterList: (() => RootCharacter[])[]): RootCharacter[] => {
        const result = filterList[0]();
        filterList.shift();

        // if (filterList.length === 0) return result;
        return filterHelper(filterList, result);

        // if result isn't defined, we use the first function
        // if (!result) {
        //     const result = filterList[0]();
        //     // const intersection = result.filter(ch => newResult.includes(ch));
        //     filterList.shift();
        //     return filterAll(filterList, result);
        // } else {
        //     const newResult = filterList[0]();
        //     const intersection = result.filter(ch => newResult.includes(ch));
        //     filterList.shift();
        //     return filterAll(filterList, intersection);
        // }
    }

    const filterHelper = (filterList: (() => RootCharacter[])[], result: RootCharacter[]): RootCharacter[] => {
        if (filterList.length === 0) return result;
        const filteredGroup = filterList[0]();

        const filteredResult = result.filter(ch => filteredGroup.includes(ch));
        // const filteredResult = result.concat(filteredGroup);

        filterList.shift();
        return filterHelper(filterList, filteredResult);
    }

    return (
        <div className="search">
            <TextField 
                variant="standard" 
                placeholder={"Search All Sessions..."} 
                fullWidth={true}
                value={val}
                onChange={(e) => onChange(e.target.value)}
            ></TextField>
        </div>
    )
}

export default SearchBar;