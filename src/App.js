import './App.css';
import AddEmployee from './components/admin/AddEmployee';
import AdminLogin from './components/admin/AdminLogin';
import EmployeeList from './components/admin/EmployeeList';
import Customer from './components/admin/Customer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/admin/Dashboard';
import RegisterTest from './components/RegisterTest';
import Register from './components/Register';
import Login from './components/Login';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/admin/AddEmployee' element={<AddEmployee/>} />
        <Route exact path='/admin/AdminLogin' element={<AdminLogin/>}/>
        <Route exact path='/admin/EmployeeList' element={<EmployeeList/>}/>
        <Route exact path='/SignIn' element={<SignIn/>}/>
        <Route exact path='/SignUp' element={<SignUp/>}/>
        <Route exact path='/admin/Dashboard' element={<Dashboard/>}/>
        <Route exact path='/RegisterTest' element={<RegisterTest/>}/>
        <Route exact path='/Register' element={<Register/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/admin/Customer' element={<Customer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
