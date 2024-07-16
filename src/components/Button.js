import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ BtName, route }) => {
  const navigate = useNavigate();
  return (
    <button type="submit" className="w-[100%] px-5 py-2 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150" onClick={()=>navigate(route)}>
      {BtName}
    </button>
  );
};

export default Button;
