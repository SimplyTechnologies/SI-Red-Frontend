import { useEffect } from "react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import vehicle_icon from "@/assets/icons/vehicle.svg?react";
import vehicles_sold_icon from "@/assets/icons/vehicles_sold.svg?react";
import customers_icon from "@/assets/icons/customers_fill.svg?react";
import { useGetAnalyticsData } from "@/api/analytics/analytics";
import CountUp from "react-countup";

export default function AnalyticsComponent() {
  const { data } = useGetAnalyticsData();

  const setTotalVehicles = useAnalyticsStore((state) => state.setTotalVehicles);
  const setCustomers = useAnalyticsStore((state) => state.setCustomers);
  const setVehiclesSold = useAnalyticsStore((state) => state.setVehiclesSold);

  useEffect(() => {
    if (data) {
      setTotalVehicles(data.totalVehicles ?? 0);
      setCustomers(data.totalCustomers ?? 0);
      setVehiclesSold(data.vehiclesSold ?? 0);
    }
  }, [data, setTotalVehicles, setCustomers, setVehiclesSold]);

  const totalVehicles = data?.totalVehicles ?? 0;
  const totalCustomers = data?.totalCustomers ?? 0;
  const soldVehicles = data?.vehiclesSold ?? 0;

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
      value: totalCustomers,
      icon: customers_icon,
    },
    {
      label: "Vehicles Sold",
      color: "#E5FAF5",
      value: soldVehicles,
      icon: vehicles_sold_icon,
    },
  ];

  return (
    <section className="w-full px-[10%] mb-[40px]">
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
                <CountUp end={item.value} duration={1.5} separator="," className="font-bold" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
