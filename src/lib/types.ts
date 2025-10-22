
export type CarFeature = string;
export type CarType = string;

export interface Car {
  id: string;
  name: string;
  type: CarType;
  imageId: string;
  features: CarFeature[];
  passengers: number;
  luggage: number;
  pricePerDay: number;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
}
