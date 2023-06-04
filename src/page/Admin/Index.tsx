/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useContext, useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading";
import { API, API_URL, TimeConverter, UserId } from "../../Services/client";
import Pagination from "../../components/pagination";
import { useAuth } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";

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
  const { authData } = useAuth();
  const refreshToken = authData?.refreshToken;

  function handlerdata() {
    return TimeConverter(7);
  }
  useEffect(() => {
    const fetchData = async () => {
      API.get("/auth/list")
        .then(function (response: any) {
          setData(response.data);
          console.log(response.data);
          console.log(data);
          console.log("feito");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [data]);

  const Ban = (data: any, typeban: string) => {
    API.post("/sanction/" + typeban, data)
      .then((response: any) => {
        setData(response.data);
        console.log(data);
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
    if (search == "") {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex);

      return currentPosts;
    }

    return data;
  }
  const filteredData = changedata(data).filter((item: any) =>
    search === ""
      ? item
      : item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 md:p-6 py-6 font-bold h-screen overflow-y-auto">
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
        <div
          className="  
                   grid grid-flow-col text-center pb-2 md:grid-cols-4"
        >
          <div className="border-x px-6 py-2">Id</div>
          <div className="border-x px-4 py-2 ">Nome</div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          filteredData.map((data: any) => (
            <div
              className="
                block
                px-6
                py-3
                border border-gray-400 mb-2
                w-full
                rounded-md
                text-black
                hover:bg-gray-100
              "
              key={data.id}
            >
              <div className="grid grid-cols-1 grid-flow-cols min-[850px]:grid-cols-4 gap-1">
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
                  className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2  px-2 rounded"
                  onClick={() =>
                    Ban({ userid: UserId(), userban: data.id }, "permanent")
                  }
                >
                  Ativar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className=" flex justify-center text-sm w-full">
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

export default Admin;
