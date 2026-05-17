export interface Customer {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  gstNumber?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CustomerFormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  gstNumber?: string
}
