export const initialUser = {
  name: "Aarav Mehta",
  email: "aarav.mehta@example.com",
  phone: "+91 98765 43210",
  bio: "Weekend home-cook, weekday food-orderer.",
  joinedAt: "Jan 2024",
  loyaltyTier: "Saffron",
  loyaltyPoints: 1240,
};

export const initialAddresses = [
  {
    id: "addr1",
    label: "Home",
    line: "B-204, Lotus Apartments",
    city: "Mumbai",
    pin: "400076",
    isDefault: true,
  },
  {
    id: "addr2",
    label: "Work",
    line: "WeWork, BKC",
    city: "Mumbai",
    pin: "400051",
    isDefault: false,
  },
];

export const initialPayments = [
  {
    id: "p1",
    type: "card",
    label: "HDFC Credit Card",
    detail: "•••• 4821",
    isDefault: true,
  },
  {
    id: "p2",
    type: "upi",
    label: "UPI",
    detail: "aarav@okhdfc",
  },
];