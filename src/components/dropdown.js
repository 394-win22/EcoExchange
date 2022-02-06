//Reference: https://mui.com/components/selects/
import React, { useCallback, useEffect, useState } from "react";
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { getItemByUser } from '../utilities/data.js'
import { useUserState } from '../utilities/firebase.js'
/*import {
    DropdownWrapper,
    StyledSelect,
    StyledOption,
    StyledLabel,
    StyledButton,
} from "./styles.js";

export function Dropdown(props) {
    return (
        <DropdownWrapper action={props.action}>
            <StyledLabel htmlFor="services">
                {props.formLabel}
            </StyledLabel>
            <StyledSelect id="services" name="services">
                {props.children}
            </StyledSelect>
            <StyledButton type="submit" value={props.buttonText} />
        </DropdownWrapper>
    );
}

export function Option(props) {
    return (
        <StyledOption selected={props.selected}>
            {props.value}
        </StyledOption>
    );
}
*/



export const Dropdown = ({ setSelected }) => {
    const [data, setData] = useState(null);
    const [user] = useUserState();
    const fetchDropdownData = useCallback(async () => {
        const fetchedData = await getItemByUser("listings", user.uid);
        setData(fetchedData);
    }, [user])
    useEffect(() => {
        fetchDropdownData();
    }, [fetchDropdownData]);
    if (!data) return <div>No Items</div>



    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelected(value)
    };

    return (
        <FormControl fullWidth="true">
            <InputLabel id="demo-simple-select-label">Your Offer</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Your Offer"
                onChange={handleChange}
            >
                {data.map((item) => (item.isActive === undefined || item.isActive === true ? <MenuItem value={item}>{item.name}</MenuItem> : <></>))}
            </Select>
            {data.length === 0 ? <text style={{ color: "red", fontSize: 8 }}>
                You must upload a listing before you can trade
            </text> : null}
        </FormControl>
    );

}