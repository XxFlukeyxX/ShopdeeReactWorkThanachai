import * as React from 'react';
import { Grid, Card, CardContent, Typography, Container, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate

// ลงทะเบียน scale ที่ต้องใช้ใน Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

export default function Dashboard() {
  const navigate = useNavigate(); // สร้างตัวแปรเพื่อใช้สำหรับการนำทาง

  // ฟังก์ชันสำหรับนำทางไปยังหน้าอื่น ๆ
  const handleAddEmployee = () => {
    navigate('/AddEmployee');  // นำทางไปยังหน้า AddEmployee
  };

  const handleViewEmployees = () => {
    navigate('/EmployeeList');  // นำทางไปยังหน้า EmployeeList
  };

  const handleLogout = () => {
    // ทำการลบ token หรือข้อมูลที่เกี่ยวข้องกับการเข้าสู่ระบบ
    localStorage.removeItem('token');
    navigate('/AdminLogin');  // นำทางไปยังหน้า Login
  };

  // ข้อมูลสำหรับ Line Chart (Sessions)
  const lineData = {
    labels: ['Apr 5', 'Apr 10', 'Apr 15', 'Apr 20', 'Apr 25', 'Apr 30'],
    datasets: [
      {
        label: 'Sessions',
        data: [5000, 7000, 9000, 12000, 17000, 22000],
        fill: true,
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: 'rgba(33, 150, 243, 1)',
      },
    ],
  };

  // ข้อมูลสำหรับ Bar Chart (Page views and downloads)
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Page Views',
        data: [5000, 10000, 8000, 11000, 14000, 9000, 7000],
        backgroundColor: 'rgba(33, 150, 243, 0.6)',
        borderColor: 'rgba(33, 150, 243, 1)',
      },
    ],
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* AppBar สำหรับหัวข้อของ Dashboard */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleAddEmployee}>เพิ่มพนักงาน</Button>
          <Button color="inherit" onClick={handleViewEmployees}>ดูข้อมูลพนักงาน</Button>
          <Button color="inherit" onClick={handleLogout}>ออกจากระบบ</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Overview Section */}
        <Typography variant="h5" component="div" gutterBottom>
          Overview
        </Typography>
        <Grid container spacing={3}>
          {/* Card 1 - Users */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Users
                </Typography>
                <Typography variant="h4" component="div">
                  14k
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last 30 days
                </Typography>
                <Typography variant="body2" sx={{ color: 'green' }}>
                  +25%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 - Conversions */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Conversions
                </Typography>
                <Typography variant="h4" component="div">
                  325
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last 30 days
                </Typography>
                <Typography variant="body2" sx={{ color: 'red' }}>
                  -25%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 - Event count */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Event count
                </Typography>
                <Typography variant="h4" component="div">
                  200k
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last 30 days
                </Typography>
                <Typography variant="body2" sx={{ color: 'blue' }}>
                  +5%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Grid สำหรับการจัดวาง Dashboard */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Sessions Line Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Sessions
                </Typography>
                <Typography variant="h4" component="div">
                  13,277 <span style={{ color: 'green' }}>+35%</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sessions per day for the last 30 days
                </Typography>
                <Line data={lineData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Page views Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Page views and downloads
                </Typography>
                <Typography variant="h4" component="div">
                  1.3M <span style={{ color: 'red' }}>-8%</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Page views and downloads for the last 6 months
                </Typography>
                <Bar data={barData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
