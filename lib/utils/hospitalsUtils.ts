// lib/utils/hospitalUtils.ts

// Hospital data interface
export interface Hospital {
  id: number;
  name: string;
  location: string;
  rating: number;
  distance: string;
  specialties: string[];
  waitTime: string;
  price: string;
  image: string;
  isPreferred: boolean;
  totalDoctors: number;
  emergencyAvailable: boolean;
  phone: string;
  address: string;
  established: number;
  beds: number;
  status: string;
}

// Filter hospitals by rating for recommendations
export const getRecommendedHospitals = (
  hospitals: Hospital[], 
  minRating: number = 4.5,
  limit: number = 4
): Hospital[] => {
  return hospitals
    .filter(hospital => hospital.rating >= minRating)
    .sort((a, b) => {
      // First sort by rating (descending)
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Then by distance (ascending) - convert distance string to number
      const distanceA = parseFloat(a.distance.replace(' km', ''));
      const distanceB = parseFloat(b.distance.replace(' km', ''));
      return distanceA - distanceB;
    })
    .slice(0, limit);
};

// Filter hospitals by location
export const getHospitalsByLocation = (
  hospitals: Hospital[], 
  location: string
): Hospital[] => {
  return hospitals.filter(hospital => 
    hospital.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Filter hospitals by specialty
export const getHospitalsBySpecialty = (
  hospitals: Hospital[], 
  specialty: string
): Hospital[] => {
  return hospitals.filter(hospital => 
    hospital.specialties.some(s => 
      s.toLowerCase().includes(specialty.toLowerCase())
    )
  );
};

// Filter hospitals with emergency services
export const getEmergencyHospitals = (hospitals: Hospital[]): Hospital[] => {
  return hospitals.filter(hospital => hospital.emergencyAvailable);
};

// Get hospitals within a certain distance
export const getNearbyHospitals = (
  hospitals: Hospital[], 
  maxDistance: number
): Hospital[] => {
  return hospitals
    .filter(hospital => {
      const distance = parseFloat(hospital.distance.replace(' km', ''));
      return distance <= maxDistance;
    })
    .sort((a, b) => {
      const distanceA = parseFloat(a.distance.replace(' km', ''));
      const distanceB = parseFloat(b.distance.replace(' km', ''));
      return distanceA - distanceB;
    });
};

// Get hospital statistics
export const getHospitalStats = (hospitals: Hospital[]) => {
  const totalHospitals = hospitals.length;
  const emergencyHospitals = hospitals.filter(h => h.emergencyAvailable).length;
  const averageRating = hospitals.reduce((sum, h) => sum + h.rating, 0) / totalHospitals;
  const totalDoctors = hospitals.reduce((sum, h) => sum + h.totalDoctors, 0);
  const totalBeds = hospitals.reduce((sum, h) => sum + h.beds, 0);
  
  return {
    totalHospitals,
    emergencyHospitals,
    averageRating: Math.round(averageRating * 10) / 10,
    totalDoctors,
    totalBeds,
    preferredHospitals: hospitals.filter(h => h.isPreferred).length
  };
};

// Search hospitals by name or specialty
export const searchHospitals = (
  hospitals: Hospital[], 
  searchTerm: string
): Hospital[] => {
  const term = searchTerm.toLowerCase();
  return hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(term) ||
    hospital.location.toLowerCase().includes(term) ||
    hospital.specialties.some(s => s.toLowerCase().includes(term))
  );
};

// Sort hospitals by different criteria
export const sortHospitals = (
  hospitals: Hospital[], 
  sortBy: 'rating' | 'distance' | 'name' | 'waitTime' = 'rating',
  order: 'asc' | 'desc' = 'desc'
): Hospital[] => {
  return [...hospitals].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'distance':
        const distanceA = parseFloat(a.distance.replace(' km', ''));
        const distanceB = parseFloat(b.distance.replace(' km', ''));
        comparison = distanceA - distanceB;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'waitTime':
        const waitA = parseInt(a.waitTime.replace(' mins', ''));
        const waitB = parseInt(b.waitTime.replace(' mins', ''));
        comparison = waitA - waitB;
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
};