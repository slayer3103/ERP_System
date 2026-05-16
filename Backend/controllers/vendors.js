const Vendor = require('../models/vendors');

exports.getAll = (req, res) => {
  Vendor.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Vendor.getById(id, (err, vendor) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  });
};

exports.getByName = (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Vendor name is required' });
  Vendor.getByName(name, (err, vendor) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  });
};

exports.create = (req, res) => {
  const data = req.body;

  // ── Required fields ──────────────────────────────────────────────
  if (!data.vendor_name || !data.vendor_name.trim())
    return res.status(400).json({ message: 'Vendor name is required' });
  if (!data.phone || !data.phone.toString().trim())
    return res.status(400).json({ message: 'Phone number is required' });
  if (!data.billing_address1 || !data.billing_address1.trim())
    return res.status(400).json({ message: 'Billing address is required' });
  if (!data.billing_city || !data.billing_city.trim())
    return res.status(400).json({ message: 'Billing city is required' });
  if (!data.billing_state || !data.billing_state.trim())
    return res.status(400).json({ message: 'Billing state is required' });
  if (!data.billing_pincode)
    return res.status(400).json({ message: 'Billing pincode is required' });
  if (!data.gst)
    return res.status(400).json({ message: 'GST number is required for vendors' });

  // ── Format validations ────────────────────────────────────────────
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return res.status(400).json({ message: 'Invalid email format' });
  if (!/^\d{10}$/.test(data.phone.toString()))
    return res.status(400).json({ message: 'Phone must be exactly 10 digits' });
  if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan.toUpperCase()))
    return res.status(400).json({ message: 'Invalid PAN format (e.g. ABCDE1234F)' });
  if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(data.gst.toUpperCase()))
    return res.status(400).json({ message: 'Invalid GST format (e.g. 27ABCDE1234F1Z5)' });
  if (!/^\d{6}$/.test(data.billing_pincode.toString()))
    return res.status(400).json({ message: 'Billing pincode must be exactly 6 digits' });
  if (data.shipping_pincode && !/^\d{6}$/.test(data.shipping_pincode.toString()))
    return res.status(400).json({ message: 'Shipping pincode must be exactly 6 digits' });

  // ── GST state code must match PAN ────────────────────────────────
  if (data.gst && data.pan) {
    const panInGst = data.gst.substring(2, 12).toUpperCase();
    if (panInGst !== data.pan.toUpperCase())
      return res.status(400).json({ message: 'PAN embedded in GST does not match the PAN field' });
  }

  // ── Bank details: if any bank field provided, all required ────────
  const hasBankField = data.account_number || data.ifsc || data.bank_name || data.account_holder_name;
  if (hasBankField) {
    if (!data.account_holder_name || !data.account_holder_name.trim())
      return res.status(400).json({ message: 'Account holder name is required when providing bank details' });
    if (!data.bank_name || !data.bank_name.trim())
      return res.status(400).json({ message: 'Bank name is required when providing bank details' });
    if (!data.account_number)
      return res.status(400).json({ message: 'Account number is required when providing bank details' });
    if (!data.ifsc)
      return res.status(400).json({ message: 'IFSC code is required when providing bank details' });
    if (!/^\d{9,18}$/.test(data.account_number.toString()))
      return res.status(400).json({ message: 'Account number must be 9-18 digits' });
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifsc.toUpperCase()))
      return res.status(400).json({ message: 'Invalid IFSC code (e.g. SBIN0001234)' });
  }

  // ── Sanitize ──────────────────────────────────────────────────────
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') data[key] = data[key].trim();
  });
  if (data.pan)  data.pan  = data.pan.toUpperCase();
  if (data.gst)  data.gst  = data.gst.toUpperCase();
  if (data.ifsc) data.ifsc = data.ifsc.toUpperCase();

  Vendor.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
};

exports.update = (req, res) => {
  Vendor.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
};

exports.remove = (req, res) => {
  Vendor.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
};

exports.updateStatus = (req, res) => {
  Vendor.updateStatus(req.params.id, req.body.status, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
};