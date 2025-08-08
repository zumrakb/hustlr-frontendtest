import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, [componentMounted]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="col-md-4 col-sm-6 col-12 mb-4">
            <div className="card h-100 rounded-4 overflow-hidden">
              <Skeleton height={250} />
              <div className="card-body">
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={16} width="60%" className="mb-2" />
                <Skeleton height={40} className="mb-3" />
                <Skeleton height={24} width="40%" className="mb-3" />
                <div className="d-flex gap-2">
                  <Skeleton height={44} className="flex-fill" />
                  <Skeleton height={44} className="flex-fill" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.length === 0 && !loading ? (
          <div className="col-12 text-center py-5">
            <h4 className="text-secondary fw-medium">Out of Stock</h4>
            <p className="text-muted">No products available in this category</p>
          </div>
        ) : (
          filter.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addProduct}
            />
          ))
        )}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
