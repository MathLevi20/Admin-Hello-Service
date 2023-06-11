import { useAuth } from "../../contexts/authContext";

export const Logout = () => {
  const { authData, signOut } = useAuth();

  return (
    <div className="w-full bg-gray-900 flex items-center justify-center flex-col h-full">
      <span className="text-4xl font-bold text-white mb-6">{"(^_^)"}</span>
      <h1 className="text-4xl font-bold text-white text-center">
        {authData?.user.username}
      </h1>
      <button
        className="mt-8 text-xl font-bold bg-gray-600 text-white px-6 py-3 rounded"
        onClick={signOut}
      >
        Sair
      </button>
    </div>
  );
};

export default Logout;
