import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
