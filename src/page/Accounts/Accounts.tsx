import axios from "axios";
import { Key, ReactNode, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, TimeConverter, UserId } from "../../Services/client";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";

interface User {
  email: string;
  average_rating: string | null;
  type: string;
  name: string;
  banided: any;
  id: string;
  Nome: string;
  cpf: string;
  username: string;
  avatar: string;
  is_banided_perm: boolean;
  is_banided_temp: boolean;
}

export const Accounts = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [data]);
  const fetchData = async () => {
    try {
      const response = await API.get("/profile/all");
      const Data = response.data;
      setData(Data);
      console.log(Data);

      setTotalPages(Math.ceil(response.data.length / postsPerPage));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBan = async (data: any, typeban: string) => {
    try {
      await API.post(`/sanction/${typeban}`, data);
      console.log("feito");
    } catch (error) {
      console.log(error);
    }
  };
  function Ban(data: any, typeban: string) {
    API.post("/sanction/" + typeban, data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(function (response: any) {
        fetchData();
        console.log(data);
        console.log("feito");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  const mockTitles = ["Usuario", "Detalhes", "Estado", "Ações"];

  function handlerdata() {
    return TimeConverter(7);
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  function changedata(data: any) {
    if (search === "" && Array.isArray(data)) {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex);
      return currentPosts;
    }
    return data;
  }
  const filteredData = Array.isArray(changedata(data))
    ? changedata(data).filter((item: any) =>
        search === ""
          ? item
          : item.username.toLowerCase().includes(search.toLowerCase()) &&
            !item.banided
      )
    : [];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex-1 px-3 md:p-6 font-bold bg-gray-100 text-center md:text-left">
      <div className="py-2 mb-4 text-2xl font-semibold flex-1">
        <h2>Accounts</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder="Procurar"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative rounded text-lg border-2 outline-none text-left"
          />
        </div>
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
                  {filteredData.map((item: any) => (
                    <tr className="bg-white" key={item.id}>
                      <td className="p-3 flex justify-left text-sm space-x-2 text-gray-700 whitespace-nowrap">
                        <Image
                          className="rounded-full"
                          src={
                            item.avatar === "linkaqui"
                              ? "https://img.icons8.com/ios/512/test-account.png"
                              : item.avatar
                          }
                          width={50}
                          height={50}
                          alt="Avatar"
                        />
                        <p className="text-left my-auto"> {item.username}</p>
                      </td>

                      <td className="p-3  justify-left text-sm space-x-2 text-gray-700 whitespace-nowrap">
                        <p className="text-left"> {item.type}</p>
                      </td>
                      <td className="p-3  justify-left text-sm space-x-2 text-gray-700 whitespace-nowrap">
                        <p className="text-left">
                          {" "}
                          {item.cyte}- {item.state}
                        </p>
                      </td>
                      <td className="p-3 space-x-2 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2   px-2 rounded "
                          onClick={(event) =>
                            (window.location.href = "/User/" + item.id)
                          }
                        >
                          Ver Perfil
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2  px-2 rounded"
                          onClick={() =>
                            Ban(
                              { userid: UserId(), userban: item.id },
                              "permanent"
                            )
                          }
                        >
                          Permanente
                        </button>
                        <button
                          className="bg-slate-800 text-sm hover:bg-slate-900 text-white font-bold py-2 px-2 rounded"
                          onClick={() =>
                            Ban(
                              {
                                userid: UserId(),
                                userban: item.id,
                                bantime: handlerdata(),
                              },
                              "temporary"
                            )
                          }
                        >
                          Temporario
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && !isLoading && (
                <div className="text-center py-4">
                  Nenhum usuário banido encontrado.
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex p-3 justify-center text-sm w-full">
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
export default Accounts;
