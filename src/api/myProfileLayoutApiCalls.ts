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

export const updateProductCartDetails = async (customerId: any, productId: any, quantity: any,price:any) => {
  try {
    const response = await ApiCall.put(`cart`,[ { customerId: customerId, productId: productId, quantity: quantity,price:price }])
      return response
  }
  catch (e) {
    console.error(e);
    return null;
  }
}

export const placeOrderApi = async (customerId: number, totalPrice: number, cartDetails: any) => {
  try {
    const items = cartDetails.map((x: any) => ({
      productId: x.productId,
      quantity: x.quantity,
      amountPaid: x.price
    }));

    const payload = {
      customerId: customerId,
      totalAmount: totalPrice,
      ordersDetails: items 
    };

    const response = await ApiCall.post(`orders`, payload);
    return response;
  }
  catch (e) {
    console.error(e);
    return null
  }

}

export const clearCartApi = async (customerId:number)=>{
  try{
          const res = await ApiCall.delete(`cart/all?customerId=${customerId}`);
          return res;      
     }
  catch(e){
    console.error(e)
    return null;
  }
}

export const fetchCustomerOrdersDetails = async (customerId: number, status?: number) => {
  try {
    const params = new URLSearchParams();

    if (customerId) params.append("customerId", customerId.toString());

    if (status !== undefined) {
      params.append("orderStatus", status.toString());
    }

    const response = await ApiCall.get(`orders?${params.toString()}`);
    if (response?.status === 200 || response?.status === 201) {
      return response.data; 
    }
    return {};
  } catch (e) {
    console.error(e);
    return null;
  }
};


export const fetchCustomerNotificationsDetails = async(customerId:number,notificationTypeId?:number,moduleId?:number) =>{
  try{
    const params = new URLSearchParams();

    if(customerId) params.append("customerId",customerId.toString());
    if(notificationTypeId) params.append("notificationTypeId",notificationTypeId.toString());
    if(moduleId) params.append("moduleId",moduleId.toString());

    const response = await ApiCall.get(`notifications?${params.toString()}`)

    if (response?.status === 200 || response?.status === 201) {
      return response.data; 
    }
    return {};
  }
  catch(e){
    console.error(e);
    return null;
  }
}

