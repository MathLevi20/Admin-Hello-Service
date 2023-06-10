import { useAuth } from "../../contexts/authContext";

export const Logout = () => {
  const { authData, signOut } = useAuth();

  return (
    <div
      className="w-screen"
      style={{
        background: "#222",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <span
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#ddd",
        }}
      >
        {"(^_^)"}
      </span>
      <h1
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          color: "#ddd",
        }}
      >
        {authData?.user.username}
      </h1>
      <button
        style={{
          marginTop: 30,
          fontSize: 16,
          borderRadius: 10,
          width: "min(300px, 90%)",
          padding: 5,
          fontWeight: "bold",
          background: "#666",
        }}
        onClick={signOut}
      >
        Sair
      </button>
    </div>
  );
};

export default Logout;
