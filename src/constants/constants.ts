export const VEHICLES_TABS = {
  VEHICLES: "Vehicles",
  FAVORITES: "Favorites",
} as const;

export const customersTableHeaders = [
  { label: "Name", sortable: true, sortKey: "name" },
  { label: "Vehicle", sortable: false, sortKey: "vehicle" },
  { label: "Assign Date", sortable: true, sortKey: "assignedDate" },
  { label: "Email", sortable: true, sortKey: "email" },
  { label: "Phone Number", sortable: true, sortKey: "phoneNumber" },
  { label: "Actions", sortable: false },
];

export const usersTableHeaders = [
  { label: "Name", sortable: true, sortKey: "name" },
  { label: "Email", sortable: true, sortKey: "email" },
  { label: "Phone Number", sortable: true, sortKey: "phoneNumber" },
  { label: "Status", sortable: true, sortKey: "status" },
  { label: "Action(s)", sortable: false },
];

export const TABLE_PAGES = {
  USERS: "users",
  CUSTOMERS: "customers",
} as const;

export const USER_STATUS = {
  ACTIVATED: "Active",
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
      type: "text",
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

export const DELETE_TITLE = {
  USER: "User",
  CUSTOMER: "Customer",
  VEHICLE: "Vehicle",
};

export const VEHICLE_DIALOG_TITLE = {
  ADD: "Add New",
  EDIT: "Edit",
};

export const USER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const availabilityOptions = [
  { id: " ", name: "Select vehicle status" },
  { id: "in stock", name: VEHICLE_STATUS["in stock"] },
  { id: "sold", name: VEHICLE_STATUS["sold"] },
];
