"use client";
import { NextResponse } from "next/server";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@/context/auth";

export default function EditForm({
  id,
  title,
  quantity,
  description,
  category
}) {
  const auth = useAuth();

  const [newTitle, setNewTitle] = useState(title);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (typeof newQuantity == "string" && isNaN(newQuantity)) {
        alert("Quantity should be  number");
        setNewQuantity("");
        return;
      } else {
        const response = await axios.put(
          `/api/items/${id}`,
          {
            title: newTitle,
            quantity: Number(newQuantity),
            description: newDescription,
            category: newCategory
          },
          {
            headers: { Authorization: `Bearer ${auth.token}` }
          }
        );
        const responseOK =
          response && response.status === 200 && response.statusText === "OK";

        if (responseOK) {
          window.location.href = "/items";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="uptodate-form">
        <div className="right-content-two">
          <label htmlFor="">
            <p>Title</p>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
          </label>
          <label htmlFor="">
            <p>Quantity</p>
            <input
              type="text"
              placeholder="Quantity"
              onChange={(e) => setNewQuantity(e.target.value)}
              value={newQuantity}
            />
          </label>
          <button type="submit"> Uptodate Item</button>
        </div>

        <div className=" left-content">
          <label htmlFor="">
            <p>Description</p>
            <textarea
              type="text"
              placeholder="description"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            />
          </label>
          <div className="select">
            <p>Category</p>
            <select
              id="select"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option name="" value=""></option>
              <option name="mobile" value="mobile">
                Mobile
              </option>
              <option name="laptop" value="laptop">
                Laptop
              </option>
              <option name="ipad" value="ipad">
                Ipad
              </option>
              <option name="tv" value="tv">
                TV
              </option>
              <option name="headphone" value="HeadPhone">
                HeadPhone
              </option>
              <option name="Mobile Accessories" value="Mobile Accessories">
                Mobile Accessories
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}