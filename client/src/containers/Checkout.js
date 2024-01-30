import DrawerAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useState,useContext,useEffect } from "react";
import CartContext from "../context/cart";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: " #8bc34a",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: " #8bc34a",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: " #8bc34a",
      },
    },
  },
});
function Checkout() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error.message);
      }
    } else {
      console.log('Token not found in local storage');
    }
  }, []);
  console.log("user-->",user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const classes = useStyles();
  const {cart}=useContext(CartContext);
  const placeOrder=()=>{
    const userDetails={
      name,
      email,
      phoneNumber,
      address
    };
    console.log(userDetails,cart);
    axios.post('http://localhost:8000/api/order',{
      user,
      userDetails,
      cart
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  return (
    <div>
      <DrawerAppBar />
      <Box sx={{ flexGrow: 1, width: "50%", margin: "0 auto", marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Checkout</h2>
          </Grid>
          <Grid item xs={6}>
            <TextField value={name} onChange={(e)=>setName(e.target.value)}
              className={classes.root}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
              className={classes.root}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={email} onChange={(e)=>setEmail(e.target.value)}
              className={classes.root}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={address} onChange={(e)=>setAddress(e.target.value)}
              className={classes.root}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={placeOrder} style={{ width: "100%", marginTop: 20 }} size="small">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default Checkout;
