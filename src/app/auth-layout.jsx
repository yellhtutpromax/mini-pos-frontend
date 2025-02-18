'use client'

import { Suspense, useMemo } from 'react';
import Header from "@/app/components/Header/Header";
import {useAuth} from "@/app/lib/authContext";
import {Loading} from "@/app/components/Loading";
import {Sidebar} from "@/app/components/General/Sidebar";

const AuthenticatedLayout = ({ children }) => {
  const { authUser, loading } = useAuth();

  const layout = useMemo(() => {
    if (loading) return <Loading />;
    if (authUser) {
      return (
        <div className="auth-layout min-h-[100dvh]">
          {/*<Sidebar />*/}
          <Header authUser={authUser} />
          <div className="md:p-5 p-4">
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </div>
        </div>
      );
    }
  }, [authUser, loading, children]);

  return layout;
};

export default AuthenticatedLayout;
