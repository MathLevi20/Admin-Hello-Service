import { ReactNode, useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, formatDate } from "../../Services/client";
import Pagination from "../../components/pagination";
import { Table } from "antd";
import Nav from "@/components/navbar/index";
import { PageContext } from "@/contexts/PageContext";

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
  const [postsPerPage, setPostsPerPage] = useState(7);
  const [top, setTop] = useState("topCenter");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/Logs/experimental");
        setData(response.data);
        const filteredData = response.data.map((item: any) => ({
          ...item,
          time: formatDate(item.time),
        }));
        setData(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrição",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Data",
      dataIndex: "time",
      key: "time",
    },
  ];
  const customTableStyle = {
    color: "black",
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  return (
    <div className={` ${isPageOpen ? "flex" : "flex-row"} md:flex w-full`}>
      <Nav />
      <div className="flex-1 px-3 md:p-6 font-bold text-center ">
        <div className={`py-2 mb-4 text-2xl font-semibold flex-1`}>
          <h2>Logs</h2>
        </div>
        <button
          type="button"
          className="flex w-max rounded bg-yellow-500 p-2 text-white  hover:bg-yellow-600 hover:text-gray-200"
          onClick={exportToJson}
        >
          Export to JSON
        </button>

        <div className="">
          {isLoading ? (
            <Loading />
          ) : (
            <Table
              style={customTableStyle}
              className=""
              rowClassName=" hover:bg-gray-200 rounded-lg "
              dataSource={data}
              columns={columns}
              pagination={{ position: ["bottomCenter"], pageSize: 10 }}
              rowKey="id"
            />
          )}
        </div>
        {/* <div className="p-1 flex justify-center w-full">
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          </div>*/}
      </div>
    </div>
  );
};

export default Log;
