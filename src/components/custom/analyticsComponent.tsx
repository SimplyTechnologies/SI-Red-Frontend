import { useAnalyticsStore } from "@/store/analyticsStore";
import vehicle_icon from "@/assets/icons/vehicle.svg?react";
import vehicles_sold_icon from "@/assets/icons/vehicles_sold.svg?react";
import customers_icon from "@/assets/icons/customers_fill.svg?react";

function AnalyticsComponent() {
  const totalVehicles = useAnalyticsStore((state) => state.totalVehicles);
  const customers = useAnalyticsStore((state) => state.customers);
  const vehiclesSold = useAnalyticsStore((state) => state.vehiclesSold);

  const analyticsData = [
    {
      label: "Vehicles Total",
      color: "#EDF1FE",
      value: totalVehicles,
      icon: vehicle_icon,
    },
    {
      label: "Customers",
      color: "#FEEDED",
      value: customers,
      icon: customers_icon,
    },
    {
      label: "Vehicles Sold",
      color: "#E5FAF5",
      value: vehiclesSold,
      icon: vehicles_sold_icon,
    },
  ];

  return (
    <section className="w-full px-4 px-[10%] mb-[40px]">
      <div className="max-w-screen-xl mx-auto">
        <h1
          id="analytics-title"
          className="font-bold text-left text-sm mb-[18px]"
        >
          Total analytics
        </h1>

        <div
          role="list"
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {analyticsData.map((item, index) => (
            <article
              key={index}
              className="h-[100px] rounded-[8px] p-4"
              style={{ backgroundColor: item.color }}
              role="listitem"
            >
              <figure className="flex items-center space-x-2">
                <item.icon />
                <figcaption>{item.label}</figcaption>
              </figure>
              <div className="pt-4 text-left">
                <span className="font-bold">{item.value.toLocaleString()}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AnalyticsComponent;
