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
    <section aria-labelledby="analytics-title">
      <header>
        <h1 id="analytics-title" className="font-bold text-left">
          Total analytics
        </h1>
      </header>
      <section
        className="flex flex-wrap justify-start gap-4 mt-4 md:gap-8 lg:justify-between"
        role="list"
      >
        {analyticsData.map((item, index) => (
          <article
            key={index}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[280px] lg:w-[310px] h-[100px] rounded-[8px] p-4"
            style={{ backgroundColor: item.color }}
            role="listitem"
          >
            <figure className="flex items-center space-x-2">
              <item.icon />
              {/* <img src={item.icon} alt={`${item.label} icon`} /> */}
              <figcaption>{item.label}</figcaption>
            </figure>
            <div className="pt-4 text-left">
              <span className="font-bold">{item.value.toLocaleString()}</span>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

export default AnalyticsComponent;
