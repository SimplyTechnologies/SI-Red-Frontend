export const VEHICLES_TABS = {
  VEHICLES: "Vehicles",
  FAVORITES: "Favorites",
} as const;

export const customersTableHeaders = [
  "Name",
  "Email",
  "Phone Number",
  "Vehicle",
  "Assigned Date",
  "Action",
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

export const ACCOUNT_ACTIVATION_INPUTS = {
  inputs: [
    {
      id: "email",
      type: "email",
      label: "Email address",
      placeholder: "example@mail.com",
    },
    {
      id: "name",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
    },
    {
      id: "confirmPassword",
      type: "password",
      label: "confirm Password",
      placeholder: "Enter Password",
    }
  ],
} as const;
