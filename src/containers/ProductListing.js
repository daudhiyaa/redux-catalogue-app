import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductComponent from "./ProductComponent";
import { setProducts } from "../redux/actions/productAction";

const ProductListing = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    // ! ACTION SET PRODUCTS (REDUCER ACTION) HERE
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const products = useSelector((state) => state);
  console.log(products);

  return (
    <div className="ui grid container">
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
