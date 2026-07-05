// Mock profile data used by the dashboard profile page

export const initialUser = {
  id: "user_1",
  name: "Ankur Sharma",
  email: "ankur@example.com",
  phone: "+91-9876543210",
  bio: "Food lover. Coffee enthusiast. Campus rep.",
  loyaltyTier: "Gold",
  loyaltyPoints: 1240,
};

export const initialAddresses = [
  {
    id: "addr_1",
    label: "Hostel Room",
    line: "Block A, Room 203",
    city: "Campus City",
    pin: "560001",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Parents' Home",
    line: "12 MG Road",
    city: "Hometown",
    pin: "110001",
    isDefault: false,
  },
];

export const initialPayments = [
  {
    id: "pay_1",
    label: "Visa **** 4242",
    detail: "Exp 12/26",
    isDefault: true,
  },
  {
    id: "pay_2",
    label: "UPI - ankur@bank",
    detail: "UPI",
    isDefault: false,
  },
];

export default null;
