export interface Expert {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  avatar: string;
  rating: number;
  reviews: number;
  verified: boolean;
  description: string;
  fullDescription: string;
  education: string[];
  certifications: string[];
  expertise: string[];
  original_price: number;
  current_price: number;
  discount: number;
  achievements: string[];
}
