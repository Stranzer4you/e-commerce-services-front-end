import axios from "axios";

export const ApiCall = axios.create({
  baseURL: process.env.REACT_APP_E_COMMERCE_BACKEND_BASE_URL
});


export const fetchCustomerWishlistDetails = async (customerId:number)=>{
    try{
        const res = await ApiCall.get(`customers/wishlist?customerId=${customerId}`)
        if (res?.status === 200 || res?.status ===201) {
          return res?.data
        }
        return {}
      } catch (e) {
        console.error(e)
        return null
      }
}


export const fetchCustomerCartDetails = async (customerId:number)=>{
    try{
        const res = await ApiCall.get(`customers/cart?customerId=${customerId}`)
        if (res?.status === 200 || res?.status ===201) {
          return res?.data
        }
        return {}
      } catch (e) {
        console.error(e)
        return null
      }
}


// export const removeProduct