import React, { useEffect, useState } from "react";

export default function SignUp(props) {
  /*   const setcurrentform = props.name;
   */
  const active = props.className;
  const setactive = props.setname;
  ////////////////////////////////////////////////////////////
  const registerLink = () => {
    setactive("");

    console.log("hi");
  };
  ////////////////////////////////////////////////////////////////7
  //variable

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  /////////////////////////////////////////////////////////////////////////777

  ///////////////////////////////////////////////////////////////////////
  function formHandle(e) {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password
    };
  }
  //console.log(alldata);
  return (
    <div className={`form-signup`}>
      <h1>Sign up</h1>
      <form action="" onSubmit={formHandle}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <input type="submit" />
      </form>

      <button onClick={registerLink}>go to signin</button>
    </div>
  );
}
