import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = (req, res, next) => {
    try{

        const { authorization } = req.headers;
        const token = authorization && authorization.split(" ")[1];
        // console.log("token-->", token);
        // console.log("test-->",req.query);
        //   console.log("req-->",req.headers.authorization);
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).send({ status: 401,message:"unauthorized" ,err });
            }
            return next()
        });
    }catch(err){
        return res.status(401).send({ status: 401, err })
    }
};
export default verifyToken;

//verify middleware jwt token using fetch
// fetch("http://localhost:8000/api/user",{
//     headers:{
//         authorization:"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY2YmIzMzkwYmU4MmRjNDBhYzEwYjAiLCJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWF0IjoxNzAxMjQ2MTY1fQ.eN8P0wdz68RqYexrrSOooTQW-aakifXUfuECVFzJW2A"
//     }
// })
// .then(res=>res.json())
// .then(res=>console.log(res))
// .catch(err=>console.log(err))