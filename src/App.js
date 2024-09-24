import './App.css';
import AddEmployee from './components/AddEmployee';
import AdminLogin from './components/AdminLogin';
import EmployeeList from './components/EmployeeList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/AddEmployee' element={<AddEmployee/>} />
        <Route exact path='/AdminLogin' element={<AdminLogin/>}/>
        <Route exact path='/EmployeeList' element={<EmployeeList/>}/>
        <Route exact path='/SignIn' element={<SignIn/>}/>
        <Route exact path='/SignUp' element={<SignUp/>}/>
        <Route exact path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
