import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./pro.module.css";
import { TailSpin } from "react-loading-icons";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function Products() {
  const [pro, setpro] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [price,setPrice]=useState("");
  let[min,setMin]=useState("");
  let[max,setMax]=useState("");
  const getProducts = async (page) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}`
      );
      console.log(data);
      setpro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getProductsSorted= async (page,sort) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}&sort=${sort}`
      );
      console.log(data);
      setpro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getProductsByPrice= async (page,price) => {
  
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}&price=${price}`
      );
      console.log(data);
      setpro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getProductsByMin= async (page,min,max) => {
    if(min == "" && max != ""){
      min = 0;
    }
    else if(max == "" && min != ""){
      max = 200;
    }
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4-five.vercel.app/products?page=${page}&price[gte]=${min}&price[lte]=${max}`
      );
      console.log(data);
      setpro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const ResetInputs = ()=>{
    setPrice("");
    setMax("");
    setMin ("");
    getProducts(1);
  }

  const getPage = async (pageNumber) => {
    setPage(pageNumber);
    setIsLoading(true);
    await getProducts(pageNumber);
  };
  const avgRate = (product) => {
    let sum = 0;
    product.reviews.map((review) => (sum += review.rating));
    return Math.round(sum / product.reviews.length);
  };

  const getStars = (avgRate) => {
    let stars = [];
    for (let i = 0; i < avgRate; i++) {
      stars.push(<FaStar color="yellow" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar />);
    }
    return stars;
  };

  useEffect(() => {
    getProducts(page);
  }, []);

  if (isLoading) {
    return (
      <>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </>
    );
  }
  return (
    <div className="container my-5">
      <select onChange={(e)=>getProductsSorted(page,e.target.value,e)}>
        <option selected>Sort Options</option>
        <option value="price">price</option>
        <option value="-price">-price</option>
        <option value="discount">discount</option>
        <option value="-discount">-discount</option>
        <option value="name">name</option>
        <option value="-name">-name</option>
      </select>
      <form onSubmit={(e)=>{e.preventDefault();getProductsByPrice(page,price)}} className={`${style.search} ms-2`}>
      <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}}  className="ms-2 p-1 me-2"/>
      <input type="submit" value="Search" className={`btn btn-primary`}/>
      </form>
      <form onSubmit={(e)=>{e.preventDefault();getProductsByMin(page,min,max)}} className={`${style.search} ms-2`}>
      <input type="text" value={min} onChange={(e)=>{setMin(e.target.value)}}  className={`${style.min} ms-2 p-1 me-2`} placeholder="min"/>
      <input type="text" value={max} onChange={(e)=>{setMax(e.target.value)}}  className={`${style.max} ms-2 p-1 me-2`} placeholder="max"/>
      <input type="submit" value="Get" className={`btn btn-primary`}/>
      </form>
      <button className={`btn btn-primary`} onClick={ResetInputs}>Reset</button>
      <div className="row">
        { pro?.products?pro.products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div
              className={`${style.pro} pro my-3  py-5  d-flex flex-column justify-content-center align-items-center`}
            >
              <img src={product.mainImage.secure_url} alt={product.name} />
              <p className="pt-2">Price: ${product.price}</p>
              <p>Discount: {product.discount}</p>
              <h2 className={`${style.pro}`}>{product.name}</h2>
              <h2>{avgRate(product)}</h2>
              <span>{getStars(avgRate(product))}</span>
              <Link to={`${product._id}`} className={`btn btn-primary`}>
                Details
              </Link>
            </div>
          </div>
        )):""}
        <nav aria-label="Page navigation example">
          <ul className="pagination ">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => getPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pro.total / pro.page }).map((_, index) => (
              <li className="page-item" key={index}>
                <button
                  className="page-link"
                  onClick={() => getPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => getPage(page + 1)}
                disabled={page === pro.total / pro.page}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
