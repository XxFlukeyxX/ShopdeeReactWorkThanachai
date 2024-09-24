import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // นำเข้า Button จาก MUI
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate แทน useHistory

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token'); // ดึง token จาก local storage
        const response = await axios.get('http://localhost:4000/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, []);

  // ฟังก์ชันเพื่อไปหน้า AddEmployee
  const handleAddEmployee = () => {
    navigate('/AddEmployee'); // เปลี่ยนไปยังเส้นทาง /AddEmployee
  };

  // ฟังก์ชันเพื่อกลับไปหน้า Dashboard
  const handleBackToDashboard = () => {
    navigate('/Dashboard'); // เปลี่ยนไปยังหน้า Dashboard
  };

  return (
    <Container component={Paper} sx={{ mt: 8, p: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom>
        รายชื่อพนักงาน
      </Typography>

      {/* ปุ่มกลับไป Add Employee */}
      <Button variant="contained" color="primary" onClick={handleAddEmployee} sx={{ mr: 2 }}>
        เพิ่มพนักงาน
      </Button>

      {/* ปุ่มกลับไป Dashboard */}
      <Button variant="contained" color="secondary" onClick={handleBackToDashboard}>
        กลับไปหน้า Dashboard
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>ชื่อผู้ใช้</TableCell>
            <TableCell>ชื่อจริง</TableCell>
            <TableCell>นามสกุล</TableCell>
            <TableCell>อีเมล</TableCell>
            <TableCell>เพศ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.empID}>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
