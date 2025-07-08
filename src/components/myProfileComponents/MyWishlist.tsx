// File: MyWishlist.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Card, CardMedia, CardContent, Rating, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../styles/myWishlistCss.css";
import { fetchCustomerWishlistDetails } from "../../api/myProfileLayoutApiCalls";
import { removeFromWishlist } from "../../api/shoppingLayoutApiCalls";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



type Wishlist ={
  productName:string,
  price:number,
  rating:number,
  productId:number,
  imageUrl: "/images/laptop2.jpg",
}


const MyWishlist = () => {

    const [wishlistDetails,setWishlistDetails] = useState<Wishlist[]>([]);

    useEffect(()=>{
      const getCustomerWishlistDetails = async (customerId:number)=>{
            const wishlistResult =await fetchCustomerWishlistDetails(customerId);
            setWishlistDetails(wishlistResult?.data)
      }
      getCustomerWishlistDetails(1);
  },[])
  

  const handleRemove = async (id: number) => {
     
     const res =await removeFromWishlist(1,id);
     if(res?.status === 200 || res?.status ==201){
      setWishlistDetails(prev =>
       prev.filter(x=> x.productId !== id));
     }
    
  };

  return (
    <Box className="wishlist-container">
      <Typography variant="h6" className="wishlist-heading">
        My Wishlist ({wishlistDetails.length})
      </Typography>

      <Box className="wishlist-grid">
        {wishlistDetails.map((item) => (
          <Card key={item.productId} className="wishlist-card">
            <CardMedia
              component="img"
              image={item.imageUrl}
              alt={item.productName}
              className="wishlist-card-img"
              sx={{background:"grey !important"}}
            />
            <CardContent className="wishlist-card-content" sx={{ padding: '0px !important' }}>
              <Typography variant="subtitle1" className="product-name">{item.productName}</Typography>
              <Typography variant="body2" className="product-price">₹{item.price.toLocaleString()}</Typography>
                <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{marginTop:'4px'}}
                />
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    endIcon={<ShoppingCartIcon />}
                    // onClick={()=>{addToCart(customerId,id,1)}}
                    sx={{width:"15px",marginTop:"4px"}}
                >
                    Add
                </Button>
            </CardContent>
            <IconButton className="delete-icon" onClick={() => handleRemove(item.productId)}>
              <DeleteIcon />
            </IconButton>
          
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyWishlist;
