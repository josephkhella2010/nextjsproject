"use client";

import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { FaSearch } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import HeaderLetter from "../components/HeaderLetter";
import TbodyContainer from "../components/TbodyContainer";

export default function page() {
  const auth = useAuth();
  const router = useRouter();

  ////////////////////////////////////////////////////////////////////////////////
  let [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState(data);
  let [filteredcheckbox, setFilterCheckbox] = useState(filteredData);

  const [Title, setTitle] = useState("");
  const [quantity, setquantity] = useState("");

  const [Description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  // State to keep track of checked items
  const [filters, setFilters] = useState({
    mobile: false,
    laptop: false,
    ipad: false,
    tv: false,
    HeadPhone: false,
    MobileAccessories: false
  });
  const header = "CrudApplication";

  //////////////////////////////7   /////////////////////////////////////////////////////////7
  //GET REQUEST
  const getFetchUrl = async () => {
    const getdata = await axios("http://localhost:3001/api/items");
    const datalist = getdata.data;

    setData(datalist);
    setFilteredData(datalist);
  };
  useEffect(() => {
    getFetchUrl();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////////7
  //POST REQUEST
  async function handleSubmit(e) {
    e.preventDefault();
    if (Title === "" || Description === "" || quantity === "") {
      alert("fill all filed");
      return;
    } else if (typeof quantity == "string" && isNaN(quantity)) {
      alert("quantity should be  number");
      setquantity("");
      return;
    } else {
      /*  const userId = req.headers.get("userId");
      console.log("User making the req: ", userId); */
      if (!auth.token) {
        alert("u should log in for add item");
        router.push("/login");
        //window.location.href = "/login";
      } else {
        try {
          await axios.post(
            "/api/items",
            {
              title: Title.toLowerCase().trim(),
              quantity: Number(quantity),

              description: Description.toLowerCase().trim(),
              category: category.toLowerCase().trim()
            },
            {
              headers: { Authorization: `Bearer ${auth.token}` }
            }
          );

          setTitle("");
          setDescription("");
          setquantity("");

          getFetchUrl();
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { msg: " put fetching error" },
            { status: 404 }
          );
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////7
  //DELETE REQUEST
  async function handleDelete(id) {
    try {
      const confirmed = confirm("Do u want to delete it?");
      if (confirmed) {
        let response = await axios.delete(`/api/items/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        getFetchUrl();
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: " put fetching error" }, { status: 404 });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////77///////////////////777
  // filter according to category,title, quantity,description
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearch(query);
    // Filter the data based on the search query
    setFilteredData(
      data.filter((d) => {
        return (
          d.category.toLowerCase().includes(query.toLowerCase().trim()) ||
          d.title.toLowerCase().includes(query.toLowerCase().trim()) ||
          d.description.toLowerCase().includes(query.toLowerCase().trim()) ||
          d.quantity == Number(query)
        );
      })
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////
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

  /**/ filteredcheckbox = filteredData.filter((item) => {
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
  //////////////////////////////////////////////////////////////
  const [show, setshow] = useState(false);
  function handlefilteredbox() {
    setshow((c) => !c);
  }
  let showitem = show ? "show-item" : "collapsed";

  /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <main className="item-page">
      <div className="container-letter">
        <HeaderLetter name={header} />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="right-content">
          <label htmlFor="">
            <p>Title</p>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              value={Title}
            />
          </label>
          <label htmlFor="">
            <p>Quantity</p>
            <input
              type="text"
              placeholder="quantity"
              onChange={(e) => setquantity(e.target.value)}
              value={quantity}
            />
          </label>

          <button type="submit"> Add Item</button>
        </div>
        <div className="left-content">
          <label htmlFor="">
            <p>Description</p>
            <textarea
              type="text"
              placeholder="write a short description for item"
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
            />
          </label>
          <div className="select">
            <p>Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <option name="HeadPhone" value="HeadPhone">
                HeadPhone
              </option>
              <option name="MobileAccessories" value="MobileAccessories">
                Mobile Accessories
              </option>
            </select>
          </div>
        </div>
      </form>
      <div className="search-div">
        <input
          type="text"
          placeholder="Search by Category or Title or Description or Quantity "
          onChange={handleInputChange}
          value={search}
          className="search-input"
        />

        <FaSearch className="search-icon" />
      </div>
      <div className={`filtered-div ${showitem}`}>
        <div className="header">
          filter by Category
          {show ? (
            <BiSolidUpArrow onClick={handlefilteredbox} />
          ) : (
            <BiSolidDownArrow onClick={handlefilteredbox} />
          )}
        </div>
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

      <div className="t-body-container">
        <TbodyContainer />

        {filteredcheckbox &&
          filteredcheckbox.map((item, index) => {
            return (
              <div className="tbody" key={index}>
                <div className="td">{index + 1}</div>
                <div className="td"> {item.title}</div>
                <div className="td">{item.quantity}</div>
                <div className="td"> {item.description}</div>
                <div className="td"> {item.category}</div>

                <div className="td">
                  <button>
                    <Link href={`/items/${item.id}`}>
                      <MdEditSquare className="edit-icon" title="Edit" />
                    </Link>
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <RiDeleteBin6Fill className="delete-icon" title="Delete" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
