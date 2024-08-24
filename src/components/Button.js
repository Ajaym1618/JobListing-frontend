import React from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd';

const Button = ({ BtName, route,pin }) => {
  const navigate = useNavigate();
  return (
    <>
    <button type="submit" className="w-[100%] flex gap-2 justify-center items-center px-5 py-2 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150" onClick={()=>navigate(route)}>
    {pin === true &&<Spin indicator={<LoadingOutlined spin className="font-bold text-white t"/>}/>}{BtName}
    </button>
  </>
  );
};

export default Button;
