import Map from "@/components/map/Map";
import AnalyticsComponent from "@/components/custom/analyticsComponent";

export default function Dashboard() {
  return (
    <div className="text-xl font-bold">
      <Map />
      <h1 className="text-xl font-bold">Dashboard</h1>
      <AnalyticsComponent />
    </div>
  );
}
