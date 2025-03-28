import { Logout } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import './FirstSection.css'

const CustomizedButton = ({ title, color, onClick }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                margin: "20px 0 0 20px",
                color: 'white',
                border: `2px solid ${color}`,
                textTransform: "capitalize",
                borderRadius: "10px",
                backgroundColor: color,
                padding: 1,
                "&:hover": {
                    color: color,
                    backgroundColor: 'white'
                }
            }}
            className={`fsbtn !font-poppins`}
        >
            {title}
        </Button>
    )
}

const FirstSection = ({ card, username, addclick, editclick, handleOpen, desc, subdesc, color }) => {
    return (
        <Box sx={{ paddingBottom: "20px !important" }} className="!w-[100%]">
            <Box className={"welcome-title"}>
                <Typography variant="h2" sx={{color: color}} >Welcome {username}!</Typography>
                <Logout
                    onClick={handleOpen}
                    sx={{
                        cursor: 'pointer',
                        color: card === "rainafashion" ? "var(--purpledark)" : card === "ats" ? "var(--orange)" : card === "Adminlist" ? 'black' : 'var(--yellowmild)',
                        height: '20px',
                        width: '20px'
                    }}
                />
            </Box>
            {
                card !== "Adminlist" && <Box>
                    <CustomizedButton onClick={card !== "ats" ? () => addclick("product") : () => addclick("service")} title={card === "ats" && subdesc ? "Add Description" : card === "ats" && desc ? "Add Subtitle" : card === "ats" ? "Add Service" : "Add Product"} color={color} />
                    <CustomizedButton onClick={() => editclick("profile")} title={"Edit Profile"} color={color} />
                </Box>
            }
        </Box>
    )
}

export default FirstSection