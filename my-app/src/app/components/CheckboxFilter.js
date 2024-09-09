"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CheckboxFilter() {
  // Sample list of items (could be fetched from an API)

  const [products, setProducts] = useState([]); // State to store product data
  const [filters, setFilters] = useState({
    mobile: false,
    laptop: false,
    ipad: false,
    tv: false,
    HeadPhone: false,
    MobileAccessories: false
  }); // State to manage filter checkboxes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  //get fetch
  ////////////////////////////////////////////////////////////////////////
  const getFetchUrl = async () => {
    const getdata = await axios("http://localhost:3001/api/items");
    const datalist = getdata.data;

    /* setData(datalist);
    setFilteredData(datalist); */
    setProducts(datalist);
    setLoading(false);
  };
  useEffect(() => {
    getFetchUrl();
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  // 1. Fetch product data (simulated with static data here)
  /*  useEffect(() => {
    // Simulate API fetching
    const fetchProducts = async () => {
      try {
        // Example product data; replace this with your actual API endpoint
        const result = [
          { id: 1, name: "Product 1", category: "A" },
          { id: 2, name: "Product 2", category: "B" },
          { id: 3, name: "Product 3", category: "A" },
          { id: 4, name: "Product 4", category: "C" },
          { id: 5, name: "Product 5", category: "B" }
        ];
        setProducts(result);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Run once on component mount
 */
  // 2. Handle checkbox changes
  const handleCheckboxChange = (e) => {
    console.log(e.target.name);
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  // 3. Filter the products based on the selected checkboxes
  const filteredProducts = products.filter((item) => {
    /*     console.log(product);
     */ // If no checkbox is selected, show all products
    /*    if (filters.mobile && item.category === "mobile") return true;
    if (filters.laptop && item.category === "laptop") return true;
    if (filters.ipad && item.category === "ipad") return true;
    if (filters.tv && item.category === "tv") return true;
    if (filters.HeadPhone && item.category === "HeadPhone") return true;

    return false*/ // Otherwise, return only products in selected categories
    /*  console.log(product.category, filters, filters[product.category]);
    return filters[product.category]; */
    if (
      !filters.mobile &&
      !filters.laptop &&
      !filters.ipad &&
      !filters.tv &&
      !filters.HeadPhone &&
      !filters.MobileAccessories
    ) {
      return true;
    }
    // Otherwise, return only products in selected categories
    return filters[item.category];
  });
  // 4. Render UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>

      {/* Checkbox filters */}
      <div>
        <label>
          <input
            type="checkbox"
            name="mobile"
            checked={filters.mobile}
            onChange={handleCheckboxChange}
          />
          mobile
        </label>
        <label>
          <input
            type="checkbox"
            name="laptop"
            checked={filters.laptop}
            onChange={handleCheckboxChange}
          />
          laptop
        </label>
        <label>
          <input
            type="checkbox"
            name="tv"
            checked={filters.tv}
            onChange={handleCheckboxChange}
          />
          tv
        </label>
        <label>
          <input
            type="checkbox"
            name="ipad"
            checked={filters.ipad}
            onChange={handleCheckboxChange}
          />
          ipad
        </label>
        <label>
          <input
            type="checkbox"
            name="HeadPhone"
            checked={filters.HeadPhone}
            onChange={handleCheckboxChange}
          />
          HeadPhone
        </label>
        <label>
          <input
            type="checkbox"
            name="MobileAccessories"
            checked={filters.MobileAccessories}
            onChange={handleCheckboxChange}
          />
          Mobile Accessories
        </label>
      </div>

      {/* Display filtered products */}
      <div>
        <h2>Products</h2>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                {product.title} - Category {product.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products match the selected filter</p>
        )}
      </div>
    </div>
  );
}
