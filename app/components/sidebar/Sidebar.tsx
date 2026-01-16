import React from 'react'
import { Home } from './home/Home'

const Sidebar = () => {
  const [tab, setTab] = React.useState('home')
  return <div className="h-full border-white/10 border-r">{tab === 'home' ? <Home /> : null}</div>
}

export default Sidebar
