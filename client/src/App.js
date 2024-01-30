import { useState } from "react";
import AppRouter from "./config/Router";
import CartContext from "./context/cart"
import { useEffect } from "react";
import { json } from "react-router-dom";
function App() {
  const [cart,setCart]=useState([]);
  useEffect(()=>{
    const cart=JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cart)
  },[])
  return(
    <CartContext.Provider value={{cart,setCart}}>
      <AppRouter />
    </CartContext.Provider>
  );
}

export default App;

