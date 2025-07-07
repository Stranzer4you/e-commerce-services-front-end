import { useEffect, useState } from "react";
import "../styles/shoppingLayoutCss.css"
import {fetchProducts,fetchAllCategories, addToWishlist, addToCart, fetchWishlistCartCount, removeFromWishlist} from "../api/shoppingLayoutApiCalls"
import { AppBar, Badge, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from "../components/shoppingComponents/ProductCard";


type ProductCategory = {
  id: number;
  productName: string;
  createdAt: string;
  isActive: boolean;
};

type Product = {
  id: number;
  productName: string;
  imageUrl: string;
  rating: number;
  price: number;
  quantity: number;
  isAvailable: boolean;
  productCategoryId: number;
  isWishListed:boolean;
  isInCart:boolean;
};


const ShoppingLayout = () =>{

     const [userDetails, setUserDetails] = useState({
        "id":1,
        "userName": "Satish",
        "phoneNumber": "9705308220",
        "email": "satishabothula12@gmail.com",
        "address": "535128 Vizianagram"
    })

    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    const [searchText, setSearchText] = useState<any>('');
    const [wishListedCount, setWishListedCount] = useState(0);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [productCategories, setProductCategories] = useState<ProductCategory[]>([])

    useEffect(() => {
    const loadData = async () => {
        const [categoryRes, wishlistCartCountRes] = await Promise.all([
            fetchAllCategories(),
            fetchWishlistCartCount(userDetails.id),
        ]);

        setProductCategories(categoryRes.data);
        setWishListedCount(wishlistCartCountRes.data.wishlistCount);
        setCartItemsCount(wishlistCartCountRes.data.cartCount);
    };
    loadData();
}, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryId = selectedCategory?.id ?? null;
                const search = searchText?.trim() ?? null;
                const result = await fetchProducts(categoryId, search);
                setProducts(result.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchData();
    }, [selectedCategory, searchText]);


    const handleAddToWishlist = async (id:number,productId:number)=>{
        const result = await addToWishlist(id,productId);
        if(result?.status ===200 || result?.status===201){
            setWishListedCount(result.data.data);
            handleWishlistUpdate(productId,true);
        }
    }

    const handleRemoveFromWishlist = async (id:number,productId:number)=>{
        const result = await removeFromWishlist(id,productId);
        if(result?.status ===200 || result?.status ===201){
            setWishListedCount(result.data.data);
            handleWishlistUpdate(productId,false);
        }
    }
    
    const handleAddToCart = async (id:number,productId:number,quantity:number)=>{
        const result = await addToCart(id,productId,quantity);
        if(result?.status ===200 || result?.status===201){
            setCartItemsCount(result.data.data);
        }
    }

    const handleWishlistUpdate = async (productId:number,status:boolean)=>{
        
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, isWishListed: status } : product
            )
        );
    };
    

    return(
        <>
        {/* TopBar */}
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

        {/* HeaderBar */}
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
                        onChange={(e) => {setSearchQuery(e.target.value)}} 
                    />
                    <Button variant="contained" sx={{
                        background: "#d80007", borderTopRightRadius: '20px', borderBottomRightRadius: '20px', borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                    }} onClick={()=>{
                                 setSearchText(searchQuery);
                                 setSelectedCategory(null)
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

        {/* NavBar */}

          <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', px: 3 ,borderBottom:'2px solid #bdbdbd'}}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
     
        <Box display="flex" gap={3}>
          {productCategories.map((category) => (
            <Box
              key={category.id}
              className={`category-button ${selectedCategory?.id === category.id ? 'active' : ''}`}
              onClick={() => {setSelectedCategory(category) ; setSearchText(null)}}
            >
              {category.productName}
              <span className="category-underline" />
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>

       {/* Products */}
            <Box sx={{ px: 4, py: 4 }}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={4}
                    justifyContent="flex-start"
                >
                    {
                        products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} {...product} addToCart={handleAddToCart} addToWishlist={handleAddToWishlist} customerId={userDetails.id} removeFromWishlist={handleRemoveFromWishlist}/>
                            ))
                        ) : (
                            <h3>No Products</h3>
                        )
                    }
                </Box>
            </Box>
    
        </>
    )
}

export default ShoppingLayout;