export type CarType = 'Sedan' | 'SUV' | 'Van' | 'Luxury';
export type CarFeature =
  | 'GPS'
  | 'Child Seat'
  | 'Automatic Transmission'
  | 'Air Conditioning'
  | 'Manual Transmission';

export type Car = {
  id: string;
  name: string;
  type: CarType;
  passengers: number;
  luggage: number;
  pricePerDay: number;
  imageId: string;
  features: CarFeature[];
};
