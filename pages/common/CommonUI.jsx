import { Box } from "@mui/material"

export const SideContainer = ({children,className}) => {
    return(
        <Box className={`!px-[30px] ${className}`}>
            {children}
        </Box>
    )
}