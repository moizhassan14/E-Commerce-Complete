import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from '@mui/material/Box';
import AlignItemsList from "./Cartlist";
export default function TemporaryDrawer({open,setOpen,cardData,deleteCart,updateQty}) {
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={open}
          onClose={()=>setOpen(false)}
        >
          <Box
            role="presentation"
          >
            <AlignItemsList updateQty={updateQty} deleteCart={deleteCart} cardData={cardData}/>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
