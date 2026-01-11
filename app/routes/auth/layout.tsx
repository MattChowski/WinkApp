import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="mx-auto h-full w-full max-w-100 px-4 py-20">
      <Outlet />
    </div>
  );
};

export default Layout;
