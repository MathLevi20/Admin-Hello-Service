import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Card } from "./Card";
import { API } from "@/Services/client";

interface DashboardData {
  online: number;
  offline: number;
  total: number;
}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    online: 0,
    offline: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/profile/statistics");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 px-3 md:p-6 font-bold  text-center md:text-left ">
      <div className="py-2 mb-4 text-2xl h-full font-semibold">
        <h2>Dashboard</h2>
        {isLoading ? (
          <div className="flex h-4/5 pl-2">
            <div className="m-auto">
              <Loading />
            </div>
          </div>
        ) : (
          <div className="flex sm:h-4/5 pl-2">
            <div className="m-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <Card key={1} Title={"Online"} Users={data.online} />
                <Card key={2} Title={"Offline"} Users={data.offline} />
                <Card key={3} Title={"Total"} Users={data.total} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
