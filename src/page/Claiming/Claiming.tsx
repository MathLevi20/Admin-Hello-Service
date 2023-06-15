import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, TimeConverter, UserId } from "../../Services/client";
import Pagination from "@mui/material/Pagination";

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
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/denounce/");
        setData(response.data);
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / postsPerPage));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
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
  const mockTitles = ["Usuario", "Detalhes", "Estado", "Tipo de Banimento"];

  return (
    <div className="flex-1 p-6 bg-gray-100 font-bold h-screen overflow-y-auto">
      <div className="py-2 mb-4 text-2xl font-semibold">
        <h2>Claiming</h2>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    {mockTitles.map((title, index) => (
                      <th
                        key={index}
                        className="w-20 p-3 text-sm font-semibold tracking-wide text-left"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentPosts.map((item) => (
                    <tr className="bg-white" key={item.id}>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <a
                          href="#"
                          className="font-bold text-blue-500 hover:underline"
                        >
                          {item.denounced}
                        </a>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.reason}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                          onClick={() => handleSolve({ id: item.id })}
                          className="p-1.5 text-xs cursor-pointer font-medium uppercase tracking-wider hover:text-green-400 text-green-800 bg-green-200 rounded-lg bg-opacity-50"
                        >
                          {item.solved === false ? "Não lida" : "Lida"}
                        </span>
                      </td>
                      <td className="p-3 space-x-2 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="rounded-md bg-red-500 hover:bg-red-700 text-sm py-2 px-2 text-white font-bold"
                          onClick={() =>
                            handleBan(
                              { userid: UserId(), userban: item.denounced_id },
                              "permanent"
                            )
                          }
                        >
                          Permanente
                        </button>
                        <button
                          className="bg-slate-800 rounded-md hover:bg-slate-900 text-sm text-white font-bold py-2 px-2"
                          onClick={() =>
                            handleBan(
                              {
                                userid: UserId(),
                                userban: item.denounced_id,
                                bantime: TimeConverter(7),
                              },
                              "temporary"
                            )
                          }
                        >
                          Temporário
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {currentPosts.map((item) => (
                <div className="bg-white  p-4 rounded-lg shadow" key={item.id}>
                  <div className=" items-center space-y-2 text-sm">
                    <div className=" text-center  mx-auto">
                      <a
                        href="#"
                        className="text-blue-500 font-bold hover:underline"
                      >
                        {item.denounced}
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-center ">
                      <span
                        onClick={() => handleSolve({ id: item.id })}
                        className=" text-xs text-center cursor-pointer font-medium uppercase tracking-wider hover:text-green-400 text-green-800 bg-green-200 rounded-lg bg-opacity-50"
                      >
                        {item.solved === false ? "Não lida" : "Lida"}
                      </span>
                    </div>
                    <div className="py-2  text-xs text-center font-medium uppercase tracking-wider  rounded-lg bg-opacity-50">
                      {item.reason}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                      className="bg-red-500 rounded-md hover:bg-red-700 text-sm py-2 px-2 text-white font-bold"
                      onClick={() =>
                        handleBan(
                          { userid: UserId(), userban: item.denounced_id },
                          "permanent"
                        )
                      }
                    >
                      Permanente
                    </button>
                    <button
                      className="bg-slate-800 rounded-md hover:bg-slate-900 text-sm text-white font-bold py-2 px-2"
                      onClick={() =>
                        handleBan(
                          {
                            userid: UserId(),
                            userban: item.denounced_id,
                            bantime: TimeConverter(7),
                          },
                          "temporary"
                        )
                      }
                    >
                      Temporário
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-3 flex justify-center w-full">
        <Pagination
          shape="rounded"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Claiming;
