import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  InputBase,
  IconButton,
  Avatar,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DiscountIcon from '@mui/icons-material/Discount';
import Sidebar from './Sidebar';
import UserMenu from './UserMenu';
import axios from 'axios';
import BASE_URL from '../config/api';

const SalesByProducts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/analytics/sales/by-products`);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch sales by product data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return `₹${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount || 0)}`;
  };

  const filteredProducts = data?.products?.filter(p =>
    p.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const maxRevenue = Math.max(...(data?.products?.map(p => parseFloat(p.total_revenue) || 0) || [1]));

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 25px ${color}25` },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ p: 1.5, borderRadius: '12px', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" fontWeight="bold" color={color} sx={{ mb: 1 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="medium">{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>{subtitle}</Typography>}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ backgroundColor: '#fff', p: 2, px: 3, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <InventoryIcon sx={{ color: '#8b5cf6' }} />
            <Typography variant="h5" fontWeight="bold" color="#1e293b">Sales By Products</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', px: 2, py: 0.5, borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <SearchIcon fontSize="small" sx={{ mr: 1, color: '#64748b' }} />
              <InputBase placeholder="Search analytics..." sx={{ fontSize: '14px' }} />
            </Box>
            <IconButton sx={{ color: '#64748b' }}><NotificationsNoneIcon /></IconButton>
            <UserMenu />
            <Avatar src="/avatar.png" sx={{ width: 32, height: 32 }} />
            <Typography fontSize={14} color="#64748b">Admin</Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: 'white' }}>📦 Sales By Products</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Track product performance and revenue contribution</Typography>
          </Paper>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress size={60} sx={{ color: '#8b5cf6' }} /></Box>
          ) : error ? (
            <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>
          ) : data ? (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 3, mb: 3 }}>
                <StatCard title="Unique Products" value={data.summary.unique_products} icon={<InventoryIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />} color="#8b5cf6" subtitle="Products sold" />
                <StatCard title="Total Revenue" value={formatCurrency(data.summary.total_product_revenue)} icon={<AttachMoneyIcon sx={{ fontSize: 28, color: '#10b981' }} />} color="#10b981" subtitle="From all products" />
                <StatCard title="Qty Sold" value={new Intl.NumberFormat('en-IN').format(data.summary.total_quantity_sold || 0)} icon={<ShoppingCartIcon sx={{ fontSize: 28, color: '#3b82f6' }} />} color="#3b82f6" subtitle="Total units" />
                <StatCard title="Total Discounts" value={formatCurrency(data.summary.total_discounts)} icon={<DiscountIcon sx={{ fontSize: 28, color: '#f59e0b' }} />} color="#f59e0b" subtitle="Given on products" />
              </Box>

              <Paper elevation={0} sx={{ p: 2, borderRadius: '12px', mb: 3, border: '1px solid #e2e8f0' }}>
                <InputBase
                  placeholder="Search products..."
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ bgcolor: '#f8f8f8', borderRadius: '10px', px: 2, py: 1, border: '1px solid #e0e0e0' }}
                />
              </Paper>

              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#334155' }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#334155' }}>Product</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#334155' }}>Times Sold</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#334155' }}>Qty Sold</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#334155' }}>Revenue</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#334155' }}>Avg Rate</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#334155' }}>Discount</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#334155', minWidth: 150 }}>Revenue Share</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((product, index) => {
                      const revenuePercent = maxRevenue > 0 ? (parseFloat(product.total_revenue) / maxRevenue) * 100 : 0;
                      return (
                        <TableRow key={index} sx={{ '&:hover': { bgcolor: '#f1f5f9' }, transition: 'background 0.2s' }}>
                          <TableCell>
                            <Chip label={index + 1} size="small" sx={{ bgcolor: index < 3 ? '#8b5cf6' : '#e2e8f0', color: index < 3 ? '#fff' : '#334155', fontWeight: 'bold', borderRadius: '8px' }} />
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="medium">{product.product_name || 'N/A'}</Typography>
                          </TableCell>
                          <TableCell align="right">{product.times_sold}</TableCell>
                          <TableCell align="right">{new Intl.NumberFormat('en-IN').format(product.total_quantity || 0)}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: '#059669' }}>{formatCurrency(product.total_revenue)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.avg_rate)}</TableCell>
                          <TableCell align="right" sx={{ color: '#f59e0b' }}>{formatCurrency(product.total_discount)}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={revenuePercent}
                                sx={{
                                  flexGrow: 1, height: 8, borderRadius: 4,
                                  bgcolor: '#e2e8f0',
                                  '& .MuiLinearProgress-bar': { borderRadius: 4, background: 'linear-gradient(90deg, #667eea, #764ba2)' },
                                }}
                              />
                              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }}>
                                {revenuePercent.toFixed(0)}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredProducts.length === 0 && (
                      <TableRow><TableCell colSpan={8} align="center" sx={{ py: 4, color: '#94a3b8' }}>No product data found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default SalesByProducts;
