import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className='auth-wrapper'>
      <Outlet />
    </div>
  );
};

export default Layout;
