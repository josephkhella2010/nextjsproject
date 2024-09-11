"use client";
import { NextResponse } from "next/server";
import EditForm from "@/app/components/EditForm";
import axios from "axios";
import { useAuth } from "@/context/auth";

import { useRouter } from "next/navigation";

////////////////////////////////////////////////////
//GET REQUEST BY ID
import React from "react";

export default async function Edit({ params }) {
  const auth = useAuth();
  const router = useRouter();
  if (!auth.token) {
    alert("u should log in for add item");
    router.push("/login");
    //window.location.href = "/login";
  } else {
    try {
      const { id } = params;
      const res = await axios(`http://localhost:3001/api/items/${id}`);
      const predata = res.data;

      const { title, quantity, description, category } = predata;

      return (
        <div>
          <h1>edit page</h1>

          <EditForm
            id={id}
            title={title}
            quantity={quantity}
            description={description}
            category={category}
          />
        </div>
      );
    } catch (error) {
      return NextResponse.json({ msg: "msg" }, { status: 404 });
    }
    /*
  const { id } = params;
   const res = await axios(`http://localhost:3001/api/items/${id}`);
  const predata = res.data;

  const { title, quantity, description, category } = predata;

  return (
    <div>
      <h1>edit page</h1>

      <EditForm
        id={id}
        title={title}
        quantity={quantity}
        description={description}
        category={category}
      />
    </div>
  ); */
  }
}
/////////////////////////////////////////////////////////////////////////////7
