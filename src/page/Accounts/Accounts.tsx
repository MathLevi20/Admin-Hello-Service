import axios from "axios";
import { Key, ReactNode, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API, TimeConverter, UserId } from "../../Services/client";
import Pagination from "../../components/pagination";
import Image from "next/image";

interface User {
  email: string;
  average_rating: string | null;
  type: string;
  name: string;
  banided: boolean;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/profile/all");
        const filteredData = response.data;
        setData(filteredData);
        console.log(filteredData);
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

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
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
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentPosts.map((data) => (
                          <tr key={data.email}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={
                                      data.avatar && data.avatar.startsWith("/")
                                        ? data.avatar
                                        : "/test-account.png"
                                    }
                                    alt="Profile Pic"
                                  />
                                </div>

                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {data.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {data.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {data.banided}
                              </div>
                              <div className="text-sm text-gray-500">
                                {data.average_rating}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                              >
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {data.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
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
