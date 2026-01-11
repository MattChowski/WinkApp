import { useNavigate } from "react-router";
import { useLogoutMutation } from "~/apiHooks/useLogoutMutation";
import Sidebar from "~/components/sidebar/Sidebar";
import { WebSocketTest } from "~/components/WebSocketTest";

const Dashboard = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <div id="dashboard" className="flex h-full w-full">
      <div className="bg-tertiary min-w-60">
        <Sidebar />
      </div>
      <button onClick={handleLogout} className="mt-4 cursor-pointer rounded-md bg-orange-600 p-2">
        Logout
      </button>
      <WebSocketTest />
    </div>
  );
};

export default Dashboard;
