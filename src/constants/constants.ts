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
      label: "Confirm Password",
      placeholder: "Enter Password",
    },
  ],
} as const;
export const VEHICLE_STATUS = {
  sold: "Sold",
  "in stock": "In Stock",
} as const;

export const passwordRules = [
  {
    label: "At least 8 characters",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "Upper case letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "Lower case letter",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "A number",
    test: (pw: string) => /\d/.test(pw),
  },
  {
    label: "A symbol",
    test: (pw: string) => /[@$!%*?&]/.test(pw),
  },
];

export type VehicleStatusKey = keyof typeof VEHICLE_STATUS;

export type VehicleStatusKeys = "sold" | "in stock";
