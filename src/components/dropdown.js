//Reference: https://mui.com/components/selects/
import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getItemByUser } from '../utilities/data.js'
import {  dummyUserId } from '../utilities/firebase.js'
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



export const Dropdown = () => {
    

    return (
        <Select labelId="demo-simple-select-label"
        id="demo-simple-select"
            label="Age">

            {getItemByUser("listings", dummyUserId)}
    </Select>)
    
}