import { AppBar, Badge, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";

const HeaderBar = () => {
    const [wishListedCount,setWishListedCount] = useState(1);
    const [cartItemsCount,setCartItemsCount] = useState(1);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2a2a2a', boxShadow: 'none', height: '80px', borderBottom: '5px solid #d80007', }}>
            <Toolbar sx={{ justifyContent: 'space-around', minHeight: '80px !important' }}>
                <Box>
                    <Typography sx={{ fontSize: "25px" }}>E-Commerce</Typography>
                </Box>
                <Box>
                    <TextField
                        variant="outlined"
                        placeholder="Search here"
                        size="medium"
                        sx={{
                            width: '300px',
                            '& .MuiOutlinedInput-root': {
                                height: '36px',
                                borderTopLeftRadius: '20px',
                                borderBottomLeftRadius: '20px',
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                                backgroundColor: 'whitesmoke',

                                '& fieldset': {
                                    borderColor: 'transparent',
                                    borderTopLeftRadius: '20px',
                                    borderBottomLeftRadius: '20px',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'red',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'red',
                                    borderWidth: '2px',
                                },
                            },
                        }}
                    />
                    <Button variant="contained" sx={{
                        background: "#d80007", borderTopRightRadius: '20px', borderBottomRightRadius: '20px', borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                    }}>Search
                    </Button>
                </Box>

                <Box display="flex" gap={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton onClick={() => console.log('Cart clicked')} sx={{
                            padding: 0, margin: 0,  color: 'whitesmoke',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                         }}>
                        <Badge
                            badgeContent={wishListedCount}
                            color="error"
                            overlap="circular"
                            
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiBadge-badge': {
                                    top: 4,        
                                    right: -6, 
                                },
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: '28px', color: 'whitesmoke' }} />
                        </Badge>
                        </IconButton>

                        <Typography
                            variant="caption"
                            sx={{ fontSize: '0.7rem', color: 'whitesmoke', marginTop: '1px' }}
                        >
                            Your Wishlist
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="center">
                       <IconButton onClick={() => console.log('Cart clicked')}  sx={{
                            padding: 0, margin: 0, color: 'whitesmoke',
                            '&:hover': {
                            backgroundColor: 'transparent',
                            },
                        }}>
                        <Badge
                            badgeContent={cartItemsCount}
                            color="error"
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiBadge-badge': {
                                    top: 4,
                                    right: -6,
                                },
                            }}
                        >
                            <ShoppingCartIcon sx={{ fontSize: '28px', color: 'whitesmoke' }} />
                        </Badge>
                        </IconButton>

                        <Typography
                            variant="caption"
                            sx={{ fontSize: '0.7rem', color: 'whitesmoke', marginTop: '1px' }}
                        >
                            Your Cart
                        </Typography>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>

    )


}

export default HeaderBar;