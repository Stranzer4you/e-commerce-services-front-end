import { useEffect, useState } from "react";
import { fetchCustomerCartDetails } from "../../api/myProfileLayoutApiCalls";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../styles/myWishlistCss.css";
import { fetchCustomerWishlistDetails } from "../../api/myProfileLayoutApiCalls";
import { removeFromCart, removeFromWishlist } from "../../api/shoppingLayoutApiCalls";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Typography } from "@mui/material";




type Cart ={
  productName:string,
  price:number,
  quantity:number,
  rating:number,
  productId:number,
  imageUrl: "/images/laptop2.jpg",
}

const MyCart = () =>{

      const [cartDetails,setCartDetails] = useState<Cart[]>([]);

      useEffect(()=>{
        const getCustomerDetails = async (customerId:any)=>{
            const cartResult = await fetchCustomerCartDetails(customerId);
            setCartDetails(cartResult?.data);
        }
        getCustomerDetails(1);
      },[])

        const handleRemove = async (id: number) => {
           const res =await removeFromCart(1,id);
           if(res?.status === 200 || res?.status ==201){
            setCartDetails(prev =>
             prev.filter(x=> x.productId !== id));
           }
        };
      

    return(
        <Box className="wishlist-container">
      <Typography variant="h6" className="wishlist-heading">
        My Cart ({cartDetails.length})
      </Typography>

      <Box className="wishlist-grid">
        {cartDetails.map((item) => (
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
            
            </CardContent>
            <IconButton className="delete-icon" onClick={() => handleRemove(item.productId)}>
              <DeleteIcon />
            </IconButton>
          
          </Card>
        ))}
      </Box>
    </Box>
    )
}

export default MyCart;