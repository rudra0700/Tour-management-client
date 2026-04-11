import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      From admin layout
      <Outlet />
    </div>
  );
};

export default AdminLayout;
