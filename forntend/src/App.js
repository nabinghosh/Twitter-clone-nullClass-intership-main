import React from 'react'
import {BrowserRouter  , Routes, Route } from 'react-router-dom'

//css
import './App.css';

//componets
import Home from './componets/Home/Home'
import LogIn from './componets/auth/LogIn'
import SignUp from './componets/auth/SignUp'
import ProtectedRoute from './componets/ProtectedRoute'
import Feed from './componets/Feed/Feed';
import Explore from './componets/Explore/Explore'
import Notifications from './componets/Notifications/Notifications'
import Messages from './componets/Messages/Messages'
import Bookmarks from './componets/Bookmarks/Bookmarks'
import Lists from './componets/Lists/Lists'
import Profile from './componets/Profile/Profile'
import More from './componets/More/More'

export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} >
            <Route index element={<Feed />} />
          </Route>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          >
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="lists" element={<Lists />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/logIn' element={<LogIn/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
