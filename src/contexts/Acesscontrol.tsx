import Loading from "@/components/Loading";
import { checkAuthorization, getUserRoles } from "@/Services/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const withAuth = (
  WrappedComponent: React.ComponentType,
  allowedRoles: string[]
) => {
  const Wrapper = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const authenticate = async () => {
        const authStatus = await checkAuthorization();
        setIsAuthenticated(authStatus);

        if (authStatus) {
          const userRoles = await getUserRoles(); // Get roles of the authenticated user
          setHasPermission(
            userRoles.some((role) => allowedRoles.includes(role))
          );
        }

        setIsLoading(false);
      };

      authenticate();
    }, []);

    if (isLoading) {
      // Exibe um indicador de carregamento enquanto as verificações estão em andamento
      return <Loading />;
    }

    if (!isAuthenticated) {
      router.push("/"); // Redireciona para a página de login se o usuário não estiver autenticado
      return null;
    }

    if (!hasPermission) {
      router.push("/Unauthorized"); // Redireciona para a página de acesso não autorizado se o usuário não tiver permissão
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
