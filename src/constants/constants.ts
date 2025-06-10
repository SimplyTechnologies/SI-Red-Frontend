export const VEHICLES_TABS = {
  VEHICLES: "Vehicles",
  FAVORITES: "Favorites",
} as const;

export const customersTableHeaders = [
  "Name",
  "Vehicle",
  "Assigned Date",
  "Email",
  "Phone Number",
  "Actions",
];

export const usersTableHeaders = [
  "Name",
  "Email",
  "Phone Number",
  "Status",
  "Action",
];

export const TABLE_PAGES = {
  USERS: "users",
  CUSTOMERS: "customers",
} as const;

export const USER_STATUS = {
  ACTIVATED: "Activated",
  PENDING: "Pending",
} as const;

export const EMPTY_TABLE_TEXT = {
  USERS:
    "At the moment, there are no users listed. However, you have the option to manually add new users.",
  CUSTOMERS: "All customers will be displayed here.",
} as const;

export const VEHICLE_STATUS = {
  sold: "Sold",
  "in stock": "In Stock",
} as const;

export type VehicleStatusKey = keyof typeof VEHICLE_STATUS;

export type VehicleStatusKeys = "sold" | "in stock";

export const DELETE_TITLE = {
  USER: "User",
  CUSTOMER: "Customer",
  VEHICLE: "Vehicle"
}
