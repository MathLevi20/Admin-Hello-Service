/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading";
import { API, API_URL, TimeConverter, UserId } from "../../Services/client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";

interface User {
  banided: boolean;
  id: string;
  Nome: string;
  cpf: string;
  username: string;
  avatar: string;
  is_banided_perm: boolean;
  is_banided_temp: boolean;
}
TimeConverter(7);

export const Admin = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const { authData } = useAuth();
  const refreshToken = authData?.refreshToken;
  const mockTitles = ["Usuario", "Detalhes", "Estado", "Tipo de Banimento"];

  function handlerdata() {
    return TimeConverter(7);
  }
  const fetchData = async () => {
    API.get("/auth/list")
      .then(function (response: any) {
        setData(response.data);

        setTotalPages(Math.ceil(response.data.length / postsPerPage));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    fetchData();
  }, [data]);

  const HandlerSwitchAdmin = (data: any, typeban: string) => {
    API.patch("/auth/" + typeban, data)
      .then((response: any) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

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
          : item.username.toLowerCase().includes(search.toLowerCase())
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
      <div
        className={`py-2 mb-4 text-2xl font-semibold text-center justify-center md:text-left flex-1 `}
      >
        <h2>Administrator</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder={"Procurar"}
            onChange={(e) => {
              setSearch(e.target.value), changedata(data);
            }}
            className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative  rounded text-lg border-2 outline-none text-left "
          />
        </div>
        <div className="m-auto flex justify-center pt-2">
          <Link href="/Register">
            <button className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Registrar
            </button>
          </Link>
        </div>
      </div>
      <div>
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
                        <td className="p-3 space-x-2 text-sm flex justify-left text-gray-700 whitespace-nowrap">
                          <Image
                            className="rounded-full"
                            src={
                              item.avatar === "linkaqui"
                                ? item.avatar
                                : "https://img.icons8.com/ios/512/test-account.png"
                            }
                            width={40}
                            height={40}
                            alt="Profile Pic"
                          />
                          <div className="my-auto">{item.username}</div>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span className=" text-xs text-center cursor-pointer font-medium uppercase tracking-wider hover:text-green-400 text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            {item.valid === true ? "Ativado" : "Não ativado"}
                          </span>
                        </td>
                        <td className="p-3 space-x-2 text-sm text-gray-700 whitespace-nowrap">
                          <button
                            className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2  px-2 rounded"
                            onClick={() =>
                              HandlerSwitchAdmin({ id: item.id }, "enable")
                            }
                          >
                            Ativar
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2  px-2 rounded"
                            onClick={() =>
                              HandlerSwitchAdmin({ id: item.id }, "disable")
                            }
                          >
                            Desativar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {filteredData.map((item: any) => (
                  <div
                    className="bg-white  p-4 rounded-lg shadow"
                    key={item.id}
                  >
                    <div className=" items-center space-y-2 text-sm">
                      <td className="p-3 space-x-2 text-sm flex justify-center text-gray-700 whitespace-nowrap">
                        <Image
                          className="rounded-full"
                          src={
                            item.avatar === "linkaqui"
                              ? item.avatar
                              : "https://img.icons8.com/ios/512/test-account.png"
                          }
                          width={40}
                          height={40}
                          alt="Profile Pic"
                        />
                        <div className="my-auto">{item.username}</div>
                      </td>
                    </div>

                    <div>
                      <div className="text-gray-500 text-center ">
                        {" "}
                        {item.type}
                      </div>
                      <div className="py-2  text-xs text-center font-medium uppercase tracking-wider  rounded-lg bg-opacity-50">
                        <span className=" text-xs text-center cursor-pointer font-medium uppercase tracking-wider hover:text-green-400 text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                          {item.valid === true ? "Ativado" : "Não ativado"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2  px-2 rounded"
                        onClick={() =>
                          HandlerSwitchAdmin({ id: item.id }, "enable")
                        }
                      >
                        Ativar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2  px-2 rounded"
                        onClick={() =>
                          HandlerSwitchAdmin({ id: item.id }, "disable")
                        }
                      >
                        Desativar
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
    </div>
  );
};

export default Admin;
