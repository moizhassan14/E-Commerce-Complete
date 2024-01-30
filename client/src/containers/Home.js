import DrawerAppBar from "../components/AppBar";
import BasicModal from "../components/BasicModal";
import MediaCard from "../components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail,setDetail]=useState({});
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const category=searchParams.get("category");
    if(!category || category === 'all'){
      axios("http://localhost:8000/api/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }
  }, [searchParams]);
  useEffect(()=>{
    // console.log(searchParams.get('category'));
    const category=searchParams.get("category");
    if(category && category !=='all'){
      axios(`http://localhost:8000/api/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    }
  },[searchParams])
  const viewDetails=(id)=>{
    // console.log("id",id);
    axios(`http://localhost:8000/api/products/${id}`)
    .then((res) =>{ 
      setDetail(res.data)
      setOpen(true)
    })
    .catch((err) => console.log(err));
  }

  // console.log("products", products);
  return (
    <div style={{ padding: 20 }}>
      <DrawerAppBar />
      <BasicModal detail={detail} open={open}  handleClose={()=>setOpen(false)}/>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products.map((v, i) => {
          return <MediaCard viewDetails={viewDetails} product={v} key={i} />;
        })}
      </div>
    </div>
  );
}

export default Home;
