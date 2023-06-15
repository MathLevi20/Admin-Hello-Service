import Loading from "@/components/Loading";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { authData, signOut } = useAuth();

  return (
    <div className=" min-h-screen font-bold  bg-slate-900 w-full overflow-y-auto">
      <div className="py-2 mb-4 text-2xl h-full font-semibold">
        <div className="flex h-4/5 pl-2">
          <div className="m-auto flex flex-col bg-slate-900">
            <span className="text-4xl p-100 text-center font-bold text-white mb-6">
              {"(^_^)"}
            </span>
            <h1 className="text-4xl font-bold text-white text-center">
              {authData?.user.username}
            </h1>
            <button
              className="mt-8 text-xl font-bold bg-gray-600 text-white px-6 py-3 rounded"
              onClick={signOut}
            >
              Sair
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
