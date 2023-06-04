import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, TimeConverter, UserId } from "../../Services/client";
import Pagination from "../../components/pagination";
import Image from "next/image";

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

const Accounts = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/profile/all");
        const filteredData = response.data.filter(
          (data: User) => !data.banided
        );
        setData(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBan = async (data: any, typeban: string) => {
    try {
      await API.post(`/sanction/${typeban}`, data);
      console.log("feito");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(
    (data: User) =>
      data.username.toLowerCase().includes(search.toLowerCase()) &&
      !data.banided
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex-1 p-6 font-bold h-full overflow-y-auto">
      <div className="py-2 mb-4 text-2xl font-semibold flex-1">
        <h2>Accounts</h2>
        <div className="mt-3 w-full flex justify-center pt-0">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative rounded text-lg border-2 outline-none text-left"
          />
        </div>
      </div>
      <div>
        <div className="py-3 grid grid-flow-col text-center md:grid-cols-5">
          <div className="border-x px-6 py-2">Id</div>
          <div className="border-x px-4 py-2">Nome</div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          currentPosts.map((data: User) => (
            <div
              className="block px-6 py-3 border border-gray-400 mb-2 w-full rounded-md text-black hover:bg-gray-100"
              key={data.id}
            >
              <div className="grid grid-cols-1 grid-flow-cols min-[850px]:grid-cols-5 gap-1">
                <img
                  className="mx-auto rounded-full"
                  src={
                    data.avatar === "linkaqui"
                      ? data.avatar
                      : "https://img.icons8.com/ios/512/test-account.png"
                  }
                  width={40}
                  height={40}
                  alt="Profile Pic"
                />
                <div className="mx-auto">{data.username}</div>

                <button
                  className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-1 px-2 rounded"
                  onClick={() => (window.location.href = "/User/" + data.id)}
                >
                  Ver Perfil
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-2 rounded"
                  onClick={() =>
                    handleBan(
                      { userid: UserId(), userban: data.id },
                      "permanent"
                    )
                  }
                >
                  Permanente
                </button>
                <button
                  className="bg-slate-800 text-sm hover:bg-slate-900 text-white font-bold py-2 px-2 rounded"
                  onClick={() =>
                    handleBan(
                      {
                        userid: UserId(),
                        userban: data.id,
                        bantime: TimeConverter(7),
                      },
                      "temporary"
                    )
                  }
                >
                  Temporario
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center text-sm w-full">
        <Pagination
          totalPosts={filteredData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Accounts;
