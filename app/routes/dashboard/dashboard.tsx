import { useNavigate } from 'react-router';
import { useLogoutMutation } from '~/apiHooks/useLogoutMutation';
import { WebSocketTest } from '~/components/WebSocketTest';

export default function Dashboard() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate('/login'),
    });
  };

  return (
    <div>
      <div>dashboard (protected)</div>
      <button onClick={handleLogout} className='bg-orange-600 rounded-md p-2 cursor-pointer mt-4'>
        Logout
      </button>
      <WebSocketTest />
    </div>
  );
}
