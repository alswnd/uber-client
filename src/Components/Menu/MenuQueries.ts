import { gql } from "apollo-boost";

export const TOGGLE_DRIVER = gql`
    mutation toggleDriver{
        ToggleDriverMode {
            ok
            error
        }
    } 
`;
