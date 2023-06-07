import Pagination from "@/components/pagination";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, TimeConverter, UserId } from "../../Services/client";

interface UserBan {
  denounced_id: any;
  solved: any;
  solve: React.ReactNode;
  reason: React.ReactNode;
  denounced: React.ReactNode;
  action: React.ReactNode;
  time: React.ReactNode;
  id: number;
  Nome: string;
  msg: string;
  by: string;
}

const Claiming = () => {
  const [data, setData] = useState<UserBan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/denounce/");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const handleBan = async (data: any, typeban: string) => {
    try {
      const response = await API.post(`/sanction/${typeban}`, data);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolve = async (data: any) => {
    try {
      const response = await API.patch("/denounce/markassolved", data);
      setData(response.data);
      console.log(response.data);
      console.log("feito");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className="py-2 mb-4 text-2xl font-semibold">
        <h2>Claiming</h2>
      </div>

      <div className="py-3 grid grid-cols-4">
        <div className="px-2 py-2">User</div>
        <div className="border-l border-r px-2 py-2">Reason</div>
        <div className="px-2 py-2">Status</div>
      </div>

      <div>
        {isLoading ? (
          <Loading />
        ) : (
          currentPosts.map((data) => (
            <div
              key={data.id}
              className="m-2 border border-gray-700 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                <div className="p-3 hover:bg-gray-200">{data.denounced}</div>
                <div className="p-3 hover:bg-gray-200">{data.reason}</div>
                <div className="p-3 hover:bg-gray-200">
                  <button
                    className={`${
                      data.solved === false
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-700"
                    } text-sm w-full py-4 text-white font-bold`}
                    onClick={() => handleSolve({ id: data.id })}
                  >
                    {data.solved === false ? "Não lida" : "Lida"}
                  </button>
                </div>
                <div className="p-3 bg-gray-800 m-3 hover:bg-gray-800">
                  <details className="relative cursor-pointer">
                    <summary className="text-white font-semibold select-none">
                      Ban
                    </summary>
                    <div className="grid gap-2 p-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-sm py-2 px-2 text-white font-bold"
                        onClick={() =>
                          handleBan(
                            { userid: UserId(), userban: data.denounced_id },
                            "permanent"
                          )
                        }
                      >
                        Permanente
                      </button>
                      <button
                        className="bg-slate-800 hover:bg-slate-900 text-sm text-white font-bold py-2 px-2"
                        onClick={() =>
                          handleBan(
                            {
                              userid: UserId(),
                              userban: data.denounced_id,
                              bantime: TimeConverter(7),
                            },
                            "temporary"
                          )
                        }
                      >
                        Temporário
                      </button>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center text-sm w-full">
        <Pagination
          totalPosts={data.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Claiming;
