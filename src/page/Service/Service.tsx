"use client";

import { useEffect, useState } from "react";
import ModalService from "./ModalService";
import ModalServicePost from "./ModalServicePost";
import Loading from "../../components/Loading";
import { API, getLocalStorage } from "../../Services/client";
import Image from "next/image";
import { type } from "os";
import { Pagination } from "@mui/material";

interface Data_Services {
  price: number;
  name: string;
  userid: string;
  description: string;
  id: string;
}

const Services = () => {
  const [data, setData] = useState<Data_Services[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(11);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const acesstoken = JSON.parse(getLocalStorage("@user") || "false");
  console.log(acesstoken);

  const userid = acesstoken ? acesstoken.user.id : "Idtas";
  console.log(userid);

  function togglePopup() {
    setPopupVisible(!popupVisible);
  }
  async function Delete(id: string) {
    API.delete("/service/delete", {
      data: {
        ServiceId: id,
      },
    })
      .then(function (response: any) {
        window.location.reload();
      })
      .catch(function (error: any) {
        console.error(error);
      });
  }

  useEffect(() => {
    try {
      API.get("/service")
        .then(function (response: any) {
          setIsLoading(true);
          setData(response.data);
          console.log(data);
          console.log("feito");
          setTotalPages(Math.ceil(response.data.length / postsPerPage));
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log("Error");
    } // complete loading success/fail
  }, [data]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  function changedata(data: any) {
    if (search == "") {
      const currentPosts = data.slice(firstPostIndex, lastPostIndex);

      return currentPosts;
    }

    return data;
  }
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex-1 p-6 font-bold h-screen overflow-y-auto">
      <div className={`py-2 mb-4 text-2xl font-semibold flex-1 `}>
        <h2>Serviços</h2>
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
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ModalServicePost />
          {changedata(data)
            .filter((data: any) => {
              console.log(data.name);
              if (data.name.toLowerCase().includes(search.toLowerCase())) {
                return data;
              }
            })
            .map((data: any) => (
              <div
                className="
                       
                        px-2
                        md:px-5
                        py-3
                        border border-gray-400 mb-2
                        w-full
                        rounded-md
                        text-black
                        cursor-pointer
                        hover:bg-gray-100"
                key={data.userid}
              >
                <div className="flex justify-between ">
                  <button className="" onClick={togglePopup}>
                    <div className="text-start truncate  pl-1 pb-1">
                      <p className="text-sm overflow-hidden truncate w-20">
                        {data.name}
                      </p>
                      <div>R$ {data.price}</div>
                    </div>
                    <button className="flex justify-end" onClick={togglePopup}>
                      <ModalService
                        descricao={data.description}
                        creator={userid}
                        value={data.price}
                        title={data.name}
                        id={data.id}
                      />
                    </button>
                  </button>
                  <button
                    className="flex py-2 justify-start ml-auto"
                    onClick={() => Delete(data.id)}
                  >
                    <Image alt="as" src="/cancel.svg" width="20" height="20" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
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

export default Services;
