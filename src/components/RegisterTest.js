import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทาง

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function AddEmployee() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(""); // เพิ่ม state สำหรับรหัสผ่าน
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // ดึง token จาก local storage
      const response = await axios.post('http://localhost:4000/api/register', {
        username,
        firstName,
        lastName,
        password, // ส่งรหัสผ่านไปยัง API
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = response.data;
      console.log(result);
      alert(result['message']);

      if (result['status'] === true) {
        navigate('/SignIn'); // เปลี่ยนเส้นทางไปยังหน้า SignIn หลังจากสมัครสมาชิกสำเร็จ
      }
    } catch (error) {
      console.error('Error adding employee', error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f3f3f3', // พื้นหลังสีเทาอ่อน
            borderRadius: 2,
            padding: 3,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // เพิ่มเงา
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="รหัสผ่าน"
              name="password"
              type="password" // ระบุให้เป็น type password
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="ชื่อจริง"
              name="firstName"
              autoComplete="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="นามสกุล"
              name="lastName"
              autoComplete="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
            />
            <Button
              id="btnRegister"
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              type="submit" // กดปุ่มเพื่อสมัครสมาชิก
            >
              สมัครสมาชิก
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
