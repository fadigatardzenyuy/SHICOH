// data/hospitals.ts

import { Hospital } from "@/lib/utils/hospitalsUtils";



export const hospitalsData: Hospital[] = [
  {
    id: 1,
    name: "Central Hospital Yaoundé",
    location: "Centre, Yaoundé",
    rating: 4.8,
    distance: "2.3 km",
    specialties: ["Cardiology", "Neurology", "Emergency", "Surgery"],
    waitTime: "15 mins",
    price: "₦₦₦",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 45,
    emergencyAvailable: true,
    phone: "+237-222-123-456",
    address: "Avenue Kennedy, Centre, Yaoundé",
    established: 1965,
    beds: 200,
    status: "open"
  },
  {
    id: 2,
    name: "Douala General Hospital",
    location: "Littoral, Douala",
    rating: 4.6,
    distance: "15.7 km",
    specialties: ["Surgery", "Pediatrics", "Oncology", "Orthopedics"],
    waitTime: "25 mins",
    price: "₦₦",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 38,
    emergencyAvailable: true,
    phone: "+237-233-789-012",
    address: "Boulevard de la Liberté, Douala",
    established: 1972,
    beds: 180,
    status: "open"
  },
  {
    id: 3,
    name: "University Teaching Hospital",
    location: "Centre, Yaoundé",
    rating: 4.7,
    distance: "5.1 km",
    specialties: ["Internal Medicine", "Dermatology", "Research", "Teaching"],
    waitTime: "30 mins",
    price: "₦₦₦₦",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 52,
    emergencyAvailable: false,
    phone: "+237-222-345-678",
    address: "University Campus, Yaoundé",
    established: 1980,
    beds: 150,
    status: "open"
  },
  {
    id: 4,
    name: "Bamenda Regional Hospital",
    location: "North-West, Bamenda",
    rating: 4.9,
    distance: "1.2 km",
    specialties: ["Maternity", "General Practice", "Emergency", "Pediatrics"],
    waitTime: "10 mins",
    price: "₦₦",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 35,
    emergencyAvailable: true,
    phone: "+237-233-456-789",
    address: "Hospital Street, Bamenda",
    established: 1978,
    beds: 120,
    status: "open"
  },
  {
    id: 5,
    name: "Presbyterian Hospital Cameroon",
    location: "North-West, Bamenda",
    rating: 4.5,
    distance: "3.8 km",
    specialties: ["General Medicine", "Surgery", "Maternity", "Pharmacy"],
    waitTime: "20 mins",
    price: "₦₦₦",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 28,
    emergencyAvailable: true,
    phone: "+237-233-567-890",
    address: "Mile 4, Bamenda",
    established: 1985,
    beds: 100,
    status: "open"
  },
  {
    id: 6,
    name: "St. Elizabeth General Hospital",
    location: "South-West, Buea",
    rating: 4.4,
    distance: "45.2 km",
    specialties: ["Emergency", "Surgery", "Internal Medicine", "Radiology"],
    waitTime: "35 mins",
    price: "₦₦₦",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 32,
    emergencyAvailable: true,
    phone: "+237-233-678-901",
    address: "Molyko Road, Buea",
    established: 1990,
    beds: 85,
    status: "open"
  },
  {
    id: 7,
    name: "Yaounde Gyneco-Obstetric Hospital",
    location: "Centre, Yaoundé",
    rating: 4.3,
    distance: "8.5 km",
    specialties: ["Gynecology", "Obstetrics", "Neonatology", "Family Planning"],
    waitTime: "40 mins",
    price: "₦₦₦₦",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 25,
    emergencyAvailable: true,
    phone: "+237-222-789-012",
    address: "Essos Quarter, Yaoundé",
    established: 1995,
    beds: 75,
    status: "open"
  },
  {
    id: 8,
    name: "Bafoussam Regional Hospital",
    location: "West, Bafoussam",
    rating: 4.2,
    distance: "85.3 km",
    specialties: ["General Practice", "Surgery", "Pediatrics", "Pharmacy"],
    waitTime: "25 mins",
    price: "₦₦",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 30,
    emergencyAvailable: true,
    phone: "+237-233-890-123",
    address: "Commercial Avenue, Bafoussam",
    established: 1982,
    beds: 110,
    status: "open"
  },
  {
    id: 9,
    name: "Limbe Regional Hospital",
    location: "South-West, Limbe",
    rating: 4.6,
    distance: "52.1 km",
    specialties: ["Emergency", "General Practice", "Surgery", "Maternity"],
    waitTime: "18 mins",
    price: "₦₦",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 26,
    emergencyAvailable: true,
    phone: "+237-233-234-567",
    address: "Down Beach Road, Limbe",
    established: 1988,
    beds: 95,
    status: "open"
  },
  {
    id: 10,
    name: "Bertoua Regional Hospital",
    location: "East, Bertoua",
    rating: 4.1,
    distance: "125.3 km",
    specialties: ["General Practice", "Emergency", "Pediatrics"],
    waitTime: "30 mins",
    price: "₦₦",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 22,
    emergencyAvailable: true,
    phone: "+237-222-456-789",
    address: "Central Market Area, Bertoua",
    established: 1992,
    beds: 80,
    status: "open"
  }
];

// Function to get hospitals data (can be replaced with API call in production)
export const getHospitalsData = (): Promise<Hospital[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(hospitalsData);
    }, 100);
  });
};

// Function to get hospital by ID
export const getHospitalById = (id: number): Hospital | undefined => {
  return hospitalsData.find(hospital => hospital.id === id);
};