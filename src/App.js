import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, addProduct } from "./Slice/productSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { data } = useSelector((state) => state.Product);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleDesc(e) {
    setDesc(e.target.value);
  }
  function handlePrice(e) {
    setPrice(e.target.value);
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = {
      id: data.length + 1,
      title: title,
      description: desc,
      price: price
    };
    dispatch(addProduct(newProduct));
    setTitle("");
    setDesc("");
    setPrice("");
  }

  return (
    <div className="App">
      <form style={{ display: "flex", flexDirection: "column", width: "40%" }}>
        <label>title</label>
        <input type="text" value={title} onChange={handleTitle} />
        <label>Description</label>
        <input type="text" value={desc} onChange={handleDesc} />
        <label>Price</label>
        <input type="number" value={price} onChange={handlePrice} />

        <button onClick={handleSubmit}>Add Product</button>
      </form>

      <h2>List of posts</h2>

      <ul>
        {data?.map((data) => {
          return (
            <React.Fragment key={data.id}>
              <li>
                {data.title} - {data.brand} - {data.price} - {data.description}
              </li>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
