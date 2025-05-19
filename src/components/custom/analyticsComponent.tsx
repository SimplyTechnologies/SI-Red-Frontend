import { useAnalyticsStore } from "../../store/analyticsStore";
import vehicle_icon from "../../../public/vehicle.svg";
import vehicles_sold_icon from "../../../public/vehicles_sold.svg";
import customers_icon from "../../../public/customers.svg";

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
      <section className="flex flex-wrap justify-around gap-8 mt-4" role="list">
        {analyticsData.map((item, index) => (
          <article
            key={index}
            className="w-[310px] h-[100px] rounded-[8px] p-4"
            style={{ backgroundColor: item.color }}
            role="listitem"
          >
            <figure className="flex items-center space-x-2">
              <img src={item.icon} alt={`${item.label} icon`} />
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
