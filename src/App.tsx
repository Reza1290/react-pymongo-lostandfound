import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage';
import {Routes, Route, useLocation} from 'react-router-dom'
import PresistLogin from './component/PresistLogin';
import RequireAuth from './middleware/RequireAuth';
import MainPage from './pages/MainPage';
import { NavbarWithMegaMenu } from './component/NavBar';
import MainLayout from './layout/MainLayout';
import EditForm from './pages/EditForm';
import InsertPage from './pages/InsertPage';
import useAuth from './hooks/useAuth';

function App() {

  const {auth}:any = useAuth()

  const isAuth = auth?.access_token != null && true

  return (
    <Routes>
      <Route path='/' element={<MainLayout isAuth={isAuth}/>} >
        {/* Public */}
        <Route path='/login' element={<AuthPage/>} />
        <Route path='/gabole' element={<>500</>} />
        {/* Public + semi */}
        {/* Protected by Roles */}
        <Route element={<PresistLogin />}>
          
            <Route path='/list' element={<MainPage/>}/>
            <Route path='/list/item/:id' element={<EditForm/>}/>
            <Route path='/list/add' element={<InsertPage/>}/>

        </Route>
            
        <Route path='*' element={<>404</>}/>
      </Route>
    </Routes>
  );
}

export default App;
