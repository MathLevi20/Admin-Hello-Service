import { ReactNode, useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, formatDate } from "../../Services/client";
import { Table } from "antd";
import { PageContext } from "@/contexts/PageContext";
import "src/page/globals.css";
import Pagination from "@mui/material/Pagination";
import { purple, red } from "@mui/material/colors";
import Tabletest from "@/components/table";

interface User_Ban {
  action: ReactNode;
  time: ReactNode;
  id: number;
  Nome: string;
  msg: string;
  by: string;
}

const Log = () => {
  const [data, setData] = useState<User_Ban[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/Logs/experimental");
        setData(response.data);
        const filteredData = response.data.map((item: any) => ({
          ...item,
          time: formatDate(item.time),
        }));
        console.log(filteredData);
        setData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / postsPerPage));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadFile = ({ data, fileName, fileType }: any) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(data),
      fileName: "users.json",
      fileType: "text/json",
    });
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const mockTitles = ["Data", "Ação", "Administrador"];

  return (
    <div className="flex-1 px-3 md:p-6 font-bold text-center ">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1`}>
        <h2>Logs</h2>
      </div>
      <button
        type="button"
        className="flex w-max rounded mx-auto md:m-0 bg-yellow-500 p-2 text-white  hover:bg-yellow-600 hover:text-gray-200"
        onClick={exportToJson}
      >
        Export to JSON
      </button>

      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="overflow-auto mt-5 rounded-lg shadow hidden md:block">
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
                      <td className="p-3 text-left text-sm text-gray-700 whitespace-nowrap">
                        <a
                          href="#"
                          className="font-bold text-blue-500 hover:underline"
                        >
                          {item.time}
                        </a>
                      </td>
                      <td className="p-3 text-left text-sm text-gray-700 whitespace-nowrap">
                        {item.action}
                      </td>
                      <td className="p-3 text-left text-sm text-gray-700 whitespace-nowrap">
                        {item.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 mt-5  sm:grid-cols-2 gap-4 md:hidden">
              {currentPosts.map((item) => (
                <div className="bg-white  p-4 rounded-lg shadow" key={item.id}>
                  <div className=" items-center space-y-2 text-sm">
                    <div className="py-2   text-xs font-medium uppercase tracking-wider  rounded-lg bg-opacity-50">
                      <p className="text-blue-500 font-bold hover:underline">
                        {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="break-words mx-auto">{item.action}</div>

                  <div>
                    <div className="py-2  text-xs font-medium uppercase tracking-wider  rounded-lg bg-opacity-50">
                      {item.id}
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2"></div>
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

export default Log;
