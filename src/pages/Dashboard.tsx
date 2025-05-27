import AnalyticsComponent from "@/components/custom/analyticsComponent";

export default function Dashboard() {
  console.log("Dashboard rendered");
  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Dashboard is rendering</p>
      <AnalyticsComponent />
    </>
  );
}
