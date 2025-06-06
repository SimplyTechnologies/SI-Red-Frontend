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
