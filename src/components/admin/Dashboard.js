import * as React from 'react';
import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Container, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate
import LogoutIcon from '@mui/icons-material/Logout';

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

export default function DashboardWithSidebar() {
  const navigate = useNavigate(); // สร้างตัวแปรเพื่อใช้สำหรับการนำทาง
  const [drawerOpen, setDrawerOpen] = useState(false); // สร้าง state สำหรับควบคุม Drawer

  // ฟังก์ชันสำหรับเปิด/ปิด Drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // ฟังก์ชันสำหรับนำทางไปยังหน้าอื่น ๆ
  const handleNavigation = (path) => {
    setDrawerOpen(false); // ปิด Drawer เมื่อคลิก
    navigate(path); // นำทางไปยังหน้าที่ระบุ
  };

  // ข้อมูลเมนูที่จะแสดงใน Sidebar
  const menuItems = [
    { text: 'แดชบอร์ด', icon: <DashboardIcon />, path: '/admin/Dashboard' },
    { text: 'รายการสั่งซื้อ', icon: <ShoppingCartIcon />, path: '/Orders' },
    { text: 'ลูกค้า', icon: <PeopleIcon />, path: '/admin/Customer' },
    { text: 'พนักงาน', icon: <PeopleIcon />, path: '/admin/EmployeeList' },
    { text: 'ประเภทสินค้า', icon: <CategoryIcon />, path: '/Categories' },
    { text: 'สินค้า', icon: <CategoryIcon />, path: '/Products' },
    { text: 'ออกจากระบบ', icon: <LogoutIcon />, action: () => {
        localStorage.removeItem('token');
        navigate('/admin/AdminLogin');
      }
    },
  ];

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
      {/* AppBar สำหรับแสดง MenuIcon */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            แดชบอร์ด
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer สำหรับแสดง Sidebar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={item.text} onClick={() => item.path ? handleNavigation(item.path) : item.action()}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>

      {/* ส่วนที่เหลือของ Dashboard */}
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
