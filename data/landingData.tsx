import React from "react";

const OrderIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 7h18M7 3v4M17 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const OfferIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeliveryIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 7h13l4 4v6H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor" />
    <circle cx="17.5" cy="18.5" r="1.5" fill="currentColor" />
  </svg>
);

export const features = [
  {
    title: "Quick Ordering",
    description: "Place orders in seconds with an intuitive menu and saved preferences.",
    icon: OrderIcon,
  },
  {
    title: "Campus Offers",
    description: "Exclusive student deals and loyalty rewards from partnered outlets.",
    icon: OfferIcon,
  },
  {
    title: "Live Delivery Tracking",
    description: "Track kitchen prep and delivery status in real time.",
    icon: DeliveryIcon,
  },
];

export const testimonials = [
  {
    name: "Aisha Khan",
    role: "Undergraduate Student",
    review: "Green Chilli Cafe makes ordering between classes effortless — love the quick re-order feature!",
  },
  {
    name: "Ravi Patel",
    role: "Graduate Student",
    review: "Great discounts and fast delivery. The app saved me so much time during finals.",
  },
  {
    name: "Maya Singh",
    role: "Student Ambassador",
    review: "Students actually use it — simple UX and reliable orders every time.",
  },
];

export default null;
