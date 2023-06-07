import { useEffect, useState } from "react";
import ContractPost from "./PostContract";
import Set from "./PutContract";
import Contract from "./Contract";
import { API } from "../../Services/client";
import Loading from "../../components/Loading";
import Pagination from "../../components/pagination";
import Image from "next/image";

interface Contract {
  id: string;
  name: string;
  content: string;
  creator: string;
}

const ContractList = () => {
  const [data, setData] = useState<Contract[]>([]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(11);
  const [search, setSearch] = useState("");

  function togglePopup() {
    setPopupVisible(!popupVisible);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/userterm/");
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

  async function Delete(id: string) {
    try {
      await API.delete("/userterm/delete", {
        data: {
          id: id,
        },
      });
      console.log("feito");
      setIsLoading(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  function filterData(data: Contract[]) {
    if (search === "") {
      return currentPosts;
    }

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div>
      <div className="mb-5 w-full flex justify-center pt-0">
        <input
          type="text"
          placeholder="Procurar"
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 flex justify-center w-3/4 placeholder-slate-900 text-black relative rounded text-lg border-2 outline-none text-left"
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-3">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ContractPost
                descricao={""}
                title={""}
                id={Object.keys(data).length + 10}
              />
              {filterData(data).map((item) => (
                <div
                  className="block px-3 py-3 border border-gray-400 mb-2 w-full rounded-md text-black cursor-pointer hover:bg-gray-100 text-[20px]"
                  key={item.id}
                >
                  <div className="flex justify-between">
                    <button className="" onClick={togglePopup}>
                      <div className="text-left pl-1">{item.name}</div>
                      <Set
                        descricao={item.content}
                        title={item.name}
                        id={item.id}
                      />
                    </button>
                    <button
                      className="flex justify-start"
                      onClick={() => Delete(item.id)}
                    >
                      <Image
                        src="/cancel.svg"
                        alt="Cancel"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
      )}
    </div>
  );
};

export default ContractList;
