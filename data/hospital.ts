// data/hospitals.ts

import { Hospital } from "@/lib/utils/hospitalsUtils";

export const hospitalsData: Hospital[] = [
  {
    id: 1,
    name: "Bamenda Regional Hospital",
    location: "North-West, Bamenda",
    rating: 4.8,
    distance: "0.5 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "15 mins",
    price: "15,000 XAF", 
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 45,
    emergencyAvailable: true,
    phone: "+237 233 36 12 87",
    address: "Up Station, Mankon, Bamenda",
    established: 1965,
    beds: 317,
    status: "open"
  },
  {
    id: 2,
    name: "Mbingo Baptist Hospital",
    location: "North-West, Mbingo",
    rating: 4.9,
    distance: "25.2 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "20 mins",
    price: "25,000 XAF",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 35,
    emergencyAvailable: true,
    phone: "+237 675 26 44 02",
    address: "Mbingo, North-West Region",
    established: 1952,
    beds: 180,
    status: "open"
  },
  {
    id: 3,
    name: "Saint Mary Soledad",
    location: "North-West, Bamenda",
    rating: 4.7,
    distance: "2.1 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "18 mins",
    price: "20,000 XAF",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 25,
    emergencyAvailable: true,
    phone: "+237 677 36 44 32",
    address: "St Mary Soledad, N11, Bamenda",
    established: 1985,
    beds: 120,
    status: "open"
  },
  {
    id: 4,
    name: "Ringland Medical",
    location: "North-West, Bamenda",
    rating: 4.5,
    distance: "3.5 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "25 mins",
    price: "18,000 XAF",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 20,
    emergencyAvailable: true,
    phone: "+237 670 08 32 56",
    address: "BP 707, Opposite St John Catholic Church, Foncha Street, Nkwen, Bamenda",
    established: 1995,
    beds: 80,
    status: "open"
  },
  {
    id: 5,
    name: "Nkwen Baptist Health Center",
    location: "North-West, Bamenda",
    rating: 4.6,
    distance: "4.2 km",
    specialties: ["General Medicine", "Maternity", "Vaccination", "Pharmacy"],
    waitTime: "15 mins",
    price: "8,000 XAF",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 12,
    emergencyAvailable: false,
    phone: "+237 675 20 57 29",
    address: "X558+PHX, N6, Bamenda",
    established: 1988,
    beds: 40,
    status: "open"
  },
  {
    id: 6,
    name: "St. Francis of Assisi Hospital Ntasen",
    location: "North-West, Bamenda",
    rating: 4.4,
    distance: "5.8 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "30 mins",
    price: "22,000 XAF",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 18,
    emergencyAvailable: true,
    phone: "+237 677 15 55 03",
    address: "X5R3+4VW Ntasen, Nkwen, Bamenda",
    established: 1978,
    beds: 85,
    status: "open"
  },
  {
    id: 7,
    name: "Acha Eye Hospital Bamenda",
    location: "North-West, Bamenda",
    rating: 4.8,
    distance: "3.1 km",
    specialties: ["Ophthalmology", "Eye Surgery", "Vision Care"],
    waitTime: "45 mins",
    price: "30,000 XAF",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 8,
    emergencyAvailable: false,
    phone: "+237 653 84 45 06",
    address: "Ntamulung, Bamenda Opposite G.B.H.S Ntamulung",
    established: 2005,
    beds: 20,
    status: "open"
  },
  {
    id: 8,
    name: "PMI District Hospital",
    location: "North-West, Bamenda",
    rating: 4.2,
    distance: "2.8 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "35 mins",
    price: "12,000 XAF",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 22,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available in original data
    address: "X59F+356, Bamenda",
    established: 1980,
    beds: 100,
    status: "open"
  },
  {
    id: 9,
    name: "Ako District Hospital",
    location: "North-West, Ako",
    rating: 4.0,
    distance: "45.3 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "25 mins",
    price: "10,000 XAF",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 15,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available
    address: "Ako, North-West Region",
    established: 1975,
    beds: 60,
    status: "open"
  },
  {
    id: 10,
    name: "Bafut District Hospital",
    location: "North-West, Bafut",
    rating: 4.1,
    distance: "18.7 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "30 mins",
    price: "11,000 XAF",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 18,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available
    address: "Bafut, North-West Region",
    established: 1982,
    beds: 75,
    status: "open"
  },
  {
    id: 11,
    name: "Bali District Hospital",
    location: "North-West, Bali",
    rating: 4.0,
    distance: "32.5 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "28 mins",
    price: "10,500 XAF",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 16,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available
    address: "Bali, North-West Region",
    established: 1978,
    beds: 65,
    status: "open"
  },
  {
    id: 12,
    name: "Batibo District Hospital",
    location: "North-West, Batibo",
    rating: 3.9,
    distance: "55.2 km",
    specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "General Surgery"],
    waitTime: "32 mins",
    price: "9,500 XAF",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop",
    isPreferred: false,
    totalDoctors: 14,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available
    address: "Batibo, North-West Region",
    established: 1985,
    beds: 55,
    status: "open"
  },
  {
    id: 13,
    name: "St. Elizabeth Catholic General Hospital Shisong",
    location: "North-West, Shisong",
    rating: 4.9,
    distance: "35.8 km",
    specialties: ["General Medicine", "Pediatrics", "Cardiac Surgery", "General Surgery"],
    waitTime: "40 mins",
    price: "35,000 XAF",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=200&fit=crop",
    isPreferred: true,
    totalDoctors: 42,
    emergencyAvailable: true,
    phone: "+237 233 XX XX XX", // Contact not available
    address: "Shisong, North-West Region",
    established: 1992,
    beds: 200,
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

// Function to get hospitals by specialty
export const getHospitalsBySpecialty = (specialty: string): Hospital[] => {
  return hospitalsData.filter(hospital => 
    hospital.specialties.some(spec => 
      spec.toLowerCase().includes(specialty.toLowerCase())
    )
  );
};

// Function to get hospitals with emergency services
export const getEmergencyHospitals = (): Hospital[] => {
  return hospitalsData.filter(hospital => hospital.emergencyAvailable);
};

// Function to get hospitals within a certain distance
export const getHospitalsWithinDistance = (maxDistance: number): Hospital[] => {
  return hospitalsData.filter(hospital => {
    const distance = parseFloat(hospital.distance.replace(' km', ''));
    return distance <= maxDistance;
  });
};