import React from 'react';
import ShoppingLayout from './layouts/ShoppingLayout';
import MyProfileLayout from './layouts/MyProfileLayout';
import { Route, Routes } from 'react-router-dom';
import MyWishlist from './components/myProfileComponents/MyWishlist';
import MyOrders from './components/myProfileComponents/MyOrders';
import MyAddress from './components/myProfileComponents/MyAddress';
import MyNotifications from './components/myProfileComponents/MyNotifications';
import MyCart from './components/myProfileComponents/MyCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingLayout />} />

      <Route path="/account" element={<MyProfileLayout />}>
        <Route path="wishlist" element={<MyWishlist />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="address" element={<MyAddress />} />
        <Route path="notifications" element={<MyNotifications />} />
        <Route path="cart" element={<MyCart/>}/>
      </Route>
    </Routes>
  );
}

export default App;
