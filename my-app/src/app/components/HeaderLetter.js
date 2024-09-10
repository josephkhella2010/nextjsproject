import React from "react";

export default function HeaderLetter(props) {
  const header = props.name;
  return (
    <>
      {header
        .split("")

        .map((item, index) => {
          return (
            <div key={index} className="div-letter">
              <p>{item}</p>
            </div>
          );
        })}
    </>
  );
}
