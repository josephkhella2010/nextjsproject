"use client";
import React from "react";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { FaUser, FaUserPlus } from "react-icons/fa";

export default function page() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    });

    if (response.ok) {
      const data = await response.json();

      console.log("data", data);
      localStorage.setItem("@library/token", data.token);
      auth.setToken(data.token);
      router.push("/items");

      return;
    }
    setError("Invalid login credentials or Email already used");
  }

  console.log("Auth", auth);
  return (
    <div>
      <form className="container-form-login" onSubmit={handleSubmit}>
        {!isLogin && (
          <div class="form__group">
            <label>User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        <div class="form__group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div class="form__group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div class="form_btn">
          <button>
            <FaUser className="login-icon" />
            {isLogin ? "Login" : "Register"}
          </button>
          <p>...or</p>

          <button
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            <FaUserPlus className="login-icon" />
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
