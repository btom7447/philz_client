
import ToursLineChart from "./ToursLineChart";
// import InquiriesBarChart from "./InquiriesBarChart";

const DashboardCharts = () => {
  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        lg:grid-cols-3
      "
    >
      <div className="lg:col-span-2">
        <ToursLineChart />
      </div>

      <div className="lg:col-span-1">
        {/* <InquiriesBarChart /> */}
      </div>
    </div>
  );
};

export default DashboardCharts;