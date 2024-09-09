import React, { useState } from "react";

export default function SignIn(props) {
  const setcurrentform = props.name;

  ///////////////////////////////////////////////////////////////////7
  const active = props.className;
  const setactive = props.setname;
  ////////////////////////////////////////////////////////////
  const registerLink = () => {
    setactive("active");

    console.log("hi");
  };

  //////////////////////////////////////////////////////////////////////

  function formHandle(e) {
    e.preventDefault();
  }

  return (
    <div className={`form-signin`}>
      <h1>Sign in</h1>
      <form action="" onSubmit={formHandle}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <input type="submit" />
      </form>

      <button onClick={registerLink}>go to register</button>
    </div>
  );
}
