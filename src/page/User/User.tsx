import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { API } from "../../Services/client";
import Comments from "./Comments";
import Empty from "./empty";
import Image from "next/image";
import { PageContext } from "@/contexts/PageContext";
import Nav from "@/components/navbar/index";

interface User {
  [x: string]: any;
  id: string;
  Nome: string;
  cpf: string;
  comments: [any];
}
interface props {
  id: any;
}
const User = (props: props) => {
  const pageContext = useContext(PageContext);
  if (!pageContext) {
    return null;
  }
  const { isPageOpen, togglePage, themePage, theme } = pageContext;

  const [data, setData] = useState<User[]>([]);
  const [complaints, setComplaints] = useState<User[]>([]);
  const [report, setReport] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useRouter();

  const Id = props.id;
  useEffect(() => {
    try {
      API.get("/profile/" + Id)
        .then(function (response: any) {
          setData(response.data);
          console.log(data);
          console.log("feito");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error: any) {
      console.log("Error");
    } // complete loading success/fail
  }, [Id, data]);
  useEffect(() => {
    API.get("/denounce/denounced/" + Id)
      .then(function (response: any) {
        setComplaints(response.data);
        console.log("feito");
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [Id]);
  useEffect(() => {
    API.get("/denounce/denouncer/" + Id)

      .then(function (response: any) {
        setReport(response.data);
        console.log("feito");
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [Id]);

  return (
    <div
      className={` ${
        isPageOpen ? "flex" : "flex-row"
      } min-h-screenmd:flex w-full`}
    >
      <Nav />
      <div className="  min-h-screen h-screen  w-full">
        <div className="h-full">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="h-full">
              <div className="mx-auto pt-8 bg-yellow-300 text-gray-800">
                {data.map((data: any) => (
                  <div key={data.id}>
                    <div>
                      <div className="flex border-inherit rounded-lg w-fit mx-auto py-2  px-3">
                        <div className="object-center my-auto mx-3">
                          <Image
                            className="mx-auto rounded-full"
                            src={
                              data.avatar == "linkaqui"
                                ? "https://img.icons8.com/ios/512/test-account.png"
                                : data.avatar
                            }
                            width="50"
                            height="50"
                            alt="Avatar"
                          />
                        </div>

                        <div>
                          <div className="flex flex-col my-auto mx-3 pt-4 ">
                            <div>User : {data.username}</div>
                            <div>
                              Name : {data.first_name} {data.last_name}
                            </div>
                            <div>Description : {data.description}</div>
                            <div>CEP : {data.zip_code}</div>
                          </div>
                        </div>
                        <div className="flex flex-col mx-2 gap-2">
                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-sm text-white font-bold py-1   px-2 rounded"
                            color=""
                          >
                            Banir Temporariamente
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-1   px-2 rounded"
                            color=""
                          >
                            Banir Permanentemente
                          </button>
                          <button
                            className="bg-slate-800 hover:bg-slate-900 text-sm text-white font-bold py-1   px-2 rounded"
                            color=""
                          >
                            Apagar Perfil
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-sm text-white font-bold py-1   px-2 rounded"
                            color=""
                          >
                            Revogar Acesso ao aplicativo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 h-full px-10 py-2   ">
                <div className="bg-black-900 ">
                  <div
                    className={`py-2 text-xl font-semibold flex-1 text-white `}
                  >
                    <h2>Complaints</h2>
                  </div>
                  {complaints.length > 0 ? (
                    complaints.map((data: any) => (
                      <Comments
                        key={data.id}
                        by={data.denounced}
                        msg={data.reason}
                      />
                    ))
                  ) : (
                    <Empty />
                  )}
                  <div
                    className={`py-2 text-xl font-semibold flex-1 text-white `}
                  >
                    <h2>Reports</h2>
                  </div>

                  {report.length > 0 ? (
                    report.map((data: any) => (
                      <Comments
                        key={data.id}
                        by={data.denounced}
                        msg={data.reason}
                      />
                    ))
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
