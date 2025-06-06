import type { CustomerWithVehicles } from "@/pages/Customers";

export function mapCustomerToTableData(c: CustomerWithVehicles) {
  return {
    id: c.id,
    name: `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim(),
    username: c.email.split("@")[0],
    phoneNumber: c.phoneNumber ?? "—",
    email: c.email,
    assignedDate: new Date(c.createdAt).toLocaleDateString(),
    vehicles: (c.vehicles ?? []).map((v) => ({
      vin: v.vin,
      model: `${v.model?.make?.name ?? "Unknown"} ${v.model?.name ?? "Model"} ${
        v.year
      }`,
      assignedDate: new Date(v.assignedDate ?? "").toLocaleDateString(),
    })),
  };
}
