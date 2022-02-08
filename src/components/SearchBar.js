import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { userToItem } from "../utilities/location";
// const searchByKeyword = ({listings}) => {
//     listings.array.forEach(element => {

//     });
//     return result;
// }

function AltSearchBar({ e }) {
    if (e.key === "Enter") {
        return e.target.value
    }
}

// const Suggestions = (props) => {
//     const options = props.results.map(r => (
//       <li key={r.id}>
//         {r.name}
//       </li>
//     ))
//     return <ul>{options}</ul>
//   }

//   export default Suggestions

const SearchBar = ({ listings, setListings, query, setQuery}) => {
    
    const [value, setValue] = useState(null)
    /*
    useEffect(() => {
        //setListings(listings.map(listing => listing.name.includes(query.trim())))
        setListings(listings.filter(listing => listing.name.toLowerCase().includes(query.trim().toLowerCase())))
    }, [query])
    */
    console.log(query)
    return (
        <>
            <div style={{ marginTop: '2.5rem', backgroundColor: 'white'}}>
            <TextField fullWidth onChange={(e) => { setQuery(e.target.value ? e.target.value : "") }} defaultValue={""} value={query} label="Search Listings" />
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                freeSolo
                options={listings}
                getOptionLabel={(option) => option.name ? option.name : ''}
                onChange={(e, selectedObj) => {
                    setQuery(e.target.value ? e.target.value : "")
                    if (selectedObj !== null) {
                        setValue(selectedObj)
                    }
                }}
                value={value}
                isOptionEqualToValue={(op, val) => op.name === val}
                defaultValue={""}
                renderInput={(params) => <TextField {...params} value={query} label="Search Listings" />}
            /> */}
            </div>
        </>
    )

};

export default SearchBar;