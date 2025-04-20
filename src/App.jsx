import Board from '~/pages/Boards/_id'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true}/>
  return <Outlet/>
}

const UnauthorizedRoute = ({ user }) => {
  if (user) return <Navigate to='/' replace={true}/>
  return <Outlet/>
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards' replace={true}/>}/>

      {/* Những rouer chỉ cho truy cập sau khi đã login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/** Board Details */}
        <Route path='/boards/:boardId' element={<Board />}/>

        {/** Board List */}
        <Route path='/boards' element={<Boards />}/>

        {/** User Profile Settings */}
        <Route path='/settings/account' element={<Settings />}/>
        <Route path='/settings/security' element={<Settings />}/>
      </Route>

      <Route element={<UnauthorizedRoute user={currentUser} />}>
        {/** Authentication */}
        <Route path='/login' element={<Auth />}/>
        <Route path='/register' element={<Auth />}/>
        <Route path='/account/verification' element={<AccountVerification />}/>
      </Route>

      {/** 404 */}
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

