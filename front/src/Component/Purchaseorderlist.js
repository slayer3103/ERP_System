import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Checkbox,
  Avatar,
  InputBase,
  Tabs,
  Tab,
  Breadcrumbs,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./Sidebar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ui from '../assets/mera.png';

import axios from "axios";

const PurchaseOrderActions = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [tab, setTab] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/purchase")
      .then((res) => {
        console.log("Purchase Orders API Response:", res.data);
        setRows(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch purchase orders:", error);
        setRows([]);
      });
  }, []);

  const filteredRows = rows.filter((row) => {
    if (tab === 0) return true;
    if (tab === 1) return row.status === "Sent";
    if (tab === 2) return row.status === "Draft";
    return true;
  });

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleEditPurchase = (id) => {
    navigate(`/edit-purchase/${id}`);
  };

  const handleDownloadPdf = async (order) => {
    try {
      // Use numeric ID, not purchase_order_no (which has slashes that break the URL)
      const response = await axios.get(`http://localhost:5000/api/purchase/${order.id}`);
      const { purchase_order: poData, vendor } = response.data;

      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        });
      };

      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency', currency: 'INR', minimumFractionDigits: 2
        }).format(amount || 0);
      };

      const subTotal = parseFloat(poData.sub_total || 0);
      const cgstRate = subTotal > 0 ? ((parseFloat(poData.cgst || 0) / subTotal) * 100).toFixed(0) : 9;
      const sgstRate = subTotal > 0 ? ((parseFloat(poData.sgst || 0) / subTotal) * 100).toFixed(0) : 9;

      const itemsHtml = (poData.items || []).map((item, index) => `
        <tr>
          <td style="border:1px solid #000;padding:4px;text-align:center;">${index + 1}</td>
          <td style="border:1px solid #000;padding:4px;">${item.description || item.item_name || ''}</td>
          <td style="border:1px solid #000;padding:4px;text-align:center;">${item.hsnCode || '—'}</td>
          <td style="border:1px solid #000;padding:4px;text-align:center;">${item.quantity || item.qty || 0}</td>
          <td style="border:1px solid #000;padding:4px;text-align:center;">${item.mou || item.unit || 'pcs'}</td>
          <td style="border:1px solid #000;padding:4px;text-align:right;">${formatCurrency(item.rate)}</td>
          <td style="border:1px solid #000;padding:4px;text-align:right;">${formatCurrency(item.amount)}</td>
        </tr>
      `).join('');

      const printWindow = window.open('', '_blank');
      if (!printWindow) { alert('Please allow popups to download PDF.'); return; }

      printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Purchase Order - ${poData.purchase_order_no}</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; padding: 20px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div style="border:2px solid #000;padding:10px;max-width:700px;margin:auto;">

    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:8px;">
      <div>
        <div style="font-size:18px;font-weight:bold;color:#003366;">MERRAKI EXPERT</div>
        <div style="font-size:9px;color:#555;">A Lean Factory...</div>
      </div>
      <div style="text-align:right;font-size:10px;">
        <div><strong>PO No:</strong> ${poData.purchase_order_no}</div>
        <div><strong>Date:</strong> ${formatDate(poData.purchase_order_date)}</div>
        <div><strong>Delivery Date:</strong> ${formatDate(poData.delivery_date)}</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;border-bottom:1px solid #000;padding:4px 0;margin-bottom:6px;font-size:9px;">
      <div><strong>GSTIN:</strong> 27AKUPY6544R1ZM</div>
      <div><strong>UDYAM-MH-20-0114278</strong></div>
    </div>

    <div style="border-bottom:1px solid #000;padding:4px 0;margin-bottom:6px;font-size:9px;">
      <div><strong>Billing Address:</strong> 101, 2nd Floor, Shri Sai Appartment, Near Kachore Lawn, Nagpur - 440015</div>
      <div><strong>Shipping Address:</strong> ${poData.shipping_address || '101, 2nd Floor, Shri Sai Appartment, Near Kachore Lawn, Nagpur - 440015'}</div>
    </div>

    <div style="text-align:center;font-weight:bold;font-size:13px;border:1px solid #000;padding:4px;margin-bottom:6px;">
      PURCHASE ORDER
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:6px;font-size:9px;">
      <tr>
        <td style="width:20%;border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">Vendor</td>
        <td style="width:30%;border:1px solid #000;padding:3px;">${vendor.company_name || vendor.vendor_name}</td>
        <td style="width:20%;border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">GSTIN</td>
        <td style="width:30%;border:1px solid #000;padding:3px;">${vendor.gst || 'N/A'}</td>
      </tr>
      <tr>
        <td style="border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">Address</td>
        <td style="border:1px solid #000;padding:3px;">${vendor.billing_address || 'N/A'}</td>
        <td style="border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">Contact</td>
        <td style="border:1px solid #000;padding:3px;">${vendor.contact_name || 'N/A'}</td>
      </tr>
      <tr>
        <td style="border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">Mobile</td>
        <td style="border:1px solid #000;padding:3px;">${vendor.mobile_no || 'N/A'}</td>
        <td style="border:1px solid #000;padding:3px;background:#f2f2f2;font-weight:bold;">Email</td>
        <td style="border:1px solid #000;padding:3px;">${vendor.email || 'N/A'}</td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:collapse;margin-bottom:6px;font-size:9px;">
      <thead>
        <tr style="background:#f2f2f2;">
          <th style="border:1px solid #000;padding:4px;width:5%;">Sr.</th>
          <th style="border:1px solid #000;padding:4px;width:30%;">Item Description</th>
          <th style="border:1px solid #000;padding:4px;width:12%;">HSN Code</th>
          <th style="border:1px solid #000;padding:4px;width:8%;">Qty</th>
          <th style="border:1px solid #000;padding:4px;width:8%;">Unit</th>
          <th style="border:1px solid #000;padding:4px;width:17%;">Rate</th>
          <th style="border:1px solid #000;padding:4px;width:20%;">Amount</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>

    <div style="display:flex;gap:0;margin-bottom:6px;">
      <div style="width:50%;border:1px solid #000;padding:6px;font-size:9px;">
        <div style="font-weight:bold;border-bottom:1px solid #000;padding-bottom:3px;margin-bottom:4px;">Terms & Conditions</div>
        <div><strong>Payment:</strong> ${poData.payment_terms || '100% After Delivery'}</div>
        <div><strong>PO Validity:</strong> ${poData.po_validity || '4 Months'}</div>
        <div><strong>Delivery:</strong> ${poData.delivery_time || '1 to 2 Weeks'}</div>
        <div><strong>Documents:</strong> ${poData.required_docs || 'Test Certificate'}</div>
      </div>
      <div style="width:50%;">
        <table style="width:100%;border-collapse:collapse;font-size:9px;">
          <tr>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">Sub Total</td>
            <td style="border:1px solid #000;padding:3px;text-align:right;">${formatCurrency(poData.sub_total)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">Freight</td>
            <td style="border:1px solid #000;padding:3px;text-align:right;">${formatCurrency(poData.freight)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">CGST @${cgstRate}%</td>
            <td style="border:1px solid #000;padding:3px;text-align:right;">${formatCurrency(poData.cgst)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">SGST @${sgstRate}%</td>
            <td style="border:1px solid #000;padding:3px;text-align:right;">${formatCurrency(poData.sgst)}</td>
          </tr>
          <tr style="background:#f2f2f2;">
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">Grand Total</td>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">${formatCurrency(poData.total)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #000;padding:3px;font-weight:bold;text-align:right;">Total in Words</td>
            <td style="border:1px solid #000;padding:3px;">${poData.total_in_words || 'N/A'}</td>
          </tr>
        </table>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:flex-end;padding-top:8px;border-top:1px solid #000;font-size:9px;">
      <div>
        <div>Email: merakkiexpert@gmail.com</div>
        <div>Mobile: +91-8793484326 / +91-9130801011</div>
        <div>www.merakkiexpert.in</div>
      </div>
      <div style="text-align:center;">
        <div style="height:50px;"></div>
        <div style="border-top:1px solid #000;padding-top:4px;font-weight:bold;">For MERRAKI EXPERT</div>
        <div>(Authorized Signatory)</div>
      </div>
    </div>

  </div>
  <script>window.onload = function(){ window.print(); }</script>
</body>
</html>`);
      printWindow.document.close();

    } catch (error) {
      console.error('PDF error:', error);
      alert('Failed to generate PDF: ' + (error.response?.data?.error || error.message));
    }
  };
  
  const handleSendEmail = (order) => {
    try {
      const subject = encodeURIComponent(
        `Purchase Order ${order.purchase_order_no || "N/A"}`
      );
      const body = encodeURIComponent(
        `Hi,\n\nHere are your purchase order details:\nOrder #: ${
          order.purchase_order_no || "N/A"
        }\nVendor: ${order.vendor_name || "N/A"}\nAmount: ₹${
          order.total || "N/A"
        }\nDelivery Date: ${
          order.delivery_date ? order.delivery_date.slice(0, 10) : "N/A"
        }`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error("Email generation failed:", error);
      alert("Failed to generate email. Please try again.");
    }
  };

  const handleShareLink = (order) => {
    try {
      navigator.clipboard.writeText(
        `https://dummy-purchase-order-link/${
          order.purchase_order_no || "unknown"
        }`
      );
      alert("Purchase order link copied to clipboard!");
    } catch (error) {
      console.error("Share link failed:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" minHeight="100vh">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Breadcrumbs>
            <Typography color="text.primary">Purchase Order</Typography>
          </Breadcrumbs>
          <Box display="flex" gap={2}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1.5,
                py: 0.5,
                borderRadius: "999px",
                border: "1px solid #e0e0e0",
                bgcolor: "#f9fafb",
                width: 240,
              }}
            >
              <SearchIcon sx={{ fontSize: 20, color: "#999" }} />
              <InputBase
                placeholder="Search anything here..."
                sx={{ ml: 1, fontSize: 14, flex: 1 }}
                inputProps={{ "aria-label": "search" }}
              />
            </Paper>
            <IconButton
              sx={{
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                bgcolor: "#f9fafb",
                p: 1,
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 20, color: "#666" }} />
            </IconButton>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://i.pravatar.cc/40?img=1" />
              <Typography fontSize={14}>Admin name</Typography>
              <ArrowDropDownIcon />
            </Box>
          </Box>
        </Box>
        <Box p={3}>
          <Paper sx={{ p: 1, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={4}
              py={2}
              borderBottom="1px solid #e0e0e0"
            >
              <Typography fontWeight="bold" fontSize={18}>
                Purchase Order
              </Typography>
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/add-purchase-order")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  bgcolor: "#004085",
                  color: "#fff",
                  "&:hover": { bgcolor: "#003366" },
                }}
              >
                + New Purchase Order
              </Button>
            </Box>
            <Box
              px={4}
              pt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Tabs
                value={tab}
                onChange={(e, newTab) => setTab(newTab)}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    bgcolor: "#f1f1f1",
                    borderRadius: 2,
                    mr: 1,
                  },
                  "& .Mui-selected": {
                    bgcolor: "#004085",
                    color: "white !important",
                  },
                  "& .MuiTabs-indicator": { display: "none" },
                }}
              >
                <Tab label="All Purchase Order" />
                <Tab label="Sent Purchase Order" />
                <Tab label="Draft Purchase Order" />
              </Tabs>
              <TextField
                size="small"
                placeholder="Search by item name..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: "white", borderRadius: 2 },
                }}
              />
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>Purchase Order #</TableCell>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Delivery Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Bill Amount</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell sx={{ color: "#0B5FFF", fontWeight: 500 }}>
                        {row.purchase_order_no || "N/A"}
                      </TableCell>
                      <TableCell>{row.vendor_name || "N/A"}</TableCell>
                      <TableCell>
                        {row.purchase_order_date
                          ? row.purchase_order_date.slice(0, 10)
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {row.delivery_date
                          ? row.delivery_date.slice(0, 10)
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{
                            backgroundColor: "#F2F4F7",
                            color: "#344054",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {row.status || "Draft"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row.total ? `₹${row.total}` : "N/A"}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleMenuOpen(e, i)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && menuIndex === i}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => {
                            handleEditPurchase(row.id);
                          }}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDownloadPdf(row)}>
                            Download PDF
                          </MenuItem>
                          <MenuItem onClick={() => handleDownloadPdf(row)}>
                            Print
                          </MenuItem>
                          <MenuItem onClick={() => handleSendEmail(row)}>
                            Send Email
                          </MenuItem>
                          <MenuItem onClick={() => handleShareLink(row)}>
                            Share Link
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography variant="body2">
                Showing 1 to {filteredRows.length} of {rows.length} entries
              </Typography>
              <Box display="flex" gap={1}>
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    size="small"
                    variant={page === 1 ? "outlined" : "text"}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseOrderActions;