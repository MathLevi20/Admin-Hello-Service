import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API } from "../../Services/client";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";

export const Blacklist = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const mockTitles = ["Perfil", "Tipo de usuario", "Cidade", "Ações"];

  useEffect(() => {
    fetchProfileData();
  }, [data]);

  const fetchProfileData = () => {
    try {
      API.get("/profile/all")
        .then(function (response: any) {
          setData(response.data);
          console.log(response.data);
          setData(response.data);
          setTotalPages(Math.ceil(response.data.length / postsPerPage));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log("Error");
    }
  };
  const handleUnban = (data: any) => {
    API.patch("/sanction/revogue", data)
      .then(function (response: any) {
        setData(response.data);
        console.log("feito");
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
      const currentPosts = data
        .slice(firstPostIndex, lastPostIndex)
        .filter((item: any) => item.banided === true);
      return currentPosts;
    }
    return data;
  }
  const filteredData = Array.isArray(changedata(data))
    ? changedata(data).filter((item: any) =>
        search === ""
          ? item
          : item.username.toLowerCase().includes(search.toLowerCase()) &&
            item.banided === true
      )
    : [];
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1`}>
        <h2>Blacklist</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder="Procurar"
            onChange={(e) => {
              setSearch(e.target.value), changedata(data);
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
                          className="bg-green-500 rounded-md hover:bg-green-700 text-sm text-white font-bold py-2 px-2 "
                          onClick={(event) =>
                            (window.location.href = "/User/" + item.id)
                          }
                        >
                          Ver Perfil
                        </button>
                        <button
                          className="bg-yellow-400 rounded-md text-[12px] hover:bg-yellow-500 text-white font-bold py-2 px-2"
                          onClick={() => handleUnban({ userban: item.id })}
                        >
                          Desbanir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length === 0 && !isLoading && (
                <div className="text-center py-4">
                  Nenhum usuário banido encontrado.
                </div>
              )}
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

export default Blacklist;
