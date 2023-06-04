'use client';

import { checkAuthorization, getUserRoles } from '@/Services/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {

      const authenticate = async () => {
        const isAuthenticated = await checkAuthorization();
        console.log(isAuthenticated)
        if (!isAuthenticated) {
          router.push('/'); // Redireciona para a página de login se o usuário não estiver autenticado
        } else {
          const userRoles = getUserRoles(); // Obtenha as funções do usuário autenticado

          // Verifica se o usuário possui uma função permitida para acessar a página
          const hasPermission = userRoles.some(role => allowedRoles.includes(role));

          if (!hasPermission) {
            router.push('/Unauthorized'); // Redireciona para a página de acesso não autorizado se o usuário não tiver permissão
          }
        }
      };

      authenticate();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
