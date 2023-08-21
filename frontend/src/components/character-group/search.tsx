import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppState } from "../../main";

const SearchBar = () => {
    const {fullState} = useContext(AppState);
    const [val, setVal] = useState<string>("");

    const filterByName = () => {
        return fullState.characters.filter(ch => ch.name.toLowerCase().includes(val.toLowerCase()))
    }

    const filterByNotes = () => {
        return fullState.characters.filter(ch => ch.notes.includes(val));
    }

    const filterByRace = () => {
        return fullState.characters.filter(ch => ch.race.includes(val));
    }

    const filterByClass = () => {
        return fullState.characters.filter(ch => ch.class.includes(val));
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

        const allChs: Character[] = [];
        const filts: (() => Character[])[] = [];
        fullState.characters.forEach(ch => allChs.push(ch));
        filters.forEach(f => filts.push(f));

        const res = filterAll([filterByName]);

        const start = new CustomEvent("startSearch", { detail: { characters: res } });
        document.dispatchEvent(start);

    }

    const filterAll = (filterList: (() => Character[])[]): Character[] => {
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

    const filterHelper = (filterList: (() => Character[])[], result: Character[]): Character[] => {
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