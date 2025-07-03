import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import '../../styles/shoppingLayoutCss.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const TopBar = () => {

    const [userDetails, setUserDetails] = useState({
        "userName": "Satish",
        "phoneNumber": "9705308220",
        "email": "satishabothula12@gmail.com",
        "address": "535128 Vizianagram"
    })

    return (
        <AppBar position="static" sx={{ backgroundColor: '#303030', boxShadow: 'none', height: '40px' }}>
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: '40px !important' }}>
                <Box display="flex" gap={3} alignItems="center">
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <LocalPhoneIcon sx={{ fontSize: '0.8rem', color: '#d80007' }} />
                        <Typography className="font-size-0-8rem whitesmoke-color red-color-hover"> {userDetails.phoneNumber} </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <EmailOutlinedIcon sx={{ fontSize: '0.85rem', color: '#d80007' }} />
                        <Typography className="font-size-0-8rem whitesmoke-color red-color-hover">{userDetails.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnOutlinedIcon sx={{ fontSize: '0.85rem', color: '#d80007' }} />
                        <Typography className="font-size-0-8rem whitesmoke-color red-color-hover">{userDetails.address}</Typography>
                    </Box>
                </Box>

                <Box display="flex" gap={3} alignItems="center">
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <PersonOutlinedIcon sx={{ fontSize: '0.85rem', color: '#d80007' }} />
                        <Typography
                            sx={{ cursor: 'pointer', textDecoration: 'none' }}
                            className="font-size-0-8rem whitesmoke-color red-color-hover"
                        >
                            My Account
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;