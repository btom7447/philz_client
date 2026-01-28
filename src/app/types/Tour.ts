export const TOUR_TYPES = [
  { label: "In-Person", value: "in-person" },
  { label: "Virtual", value: "virtual" },
];

export interface TourRequestFormValues {
  name: string;
  email: string;
  phone: string;
  tourType: "virtual" | "in-person";
  tourTime: string;
  message: string;
}

export interface TourRequestPayload {
  propertyId: string;
  type: "virtual" | "in-person";
  tourTime: string; 
}

export interface ITourRequestPopulated {
  _id: string;
  type: "virtual" | "in-person";
  status: "pending" | "approved" | "rejected" | "canceled";
  tourTime: string;
  requestedAt: string;
  rescheduled?: boolean;

  propertyId: {
    _id: string;
    title: string;
    address: string;
    propertyType: string;
    images?: string[];
  };

  userId: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}