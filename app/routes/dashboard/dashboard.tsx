import { Outlet, useNavigate } from 'react-router'
import { useLogoutMutation } from '~/apiHooks/useLogoutMutation'
import Sidebar from '~/components/sidebar/Sidebar'

const Dashboard = () => {
  const navigate = useNavigate()
  const { mutate: logout } = useLogoutMutation()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate('/login'),
    })
  }

  return (
    <div id="dashboard" className="flex h-full w-full">
      <div className="min-w-60 bg-tertiary">
        <Sidebar />
      </div>
      <main className="grow bg-tertiary">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
