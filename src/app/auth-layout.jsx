'use client'

import { useMemo } from 'react';
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
        <div className="auth-layout flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header authUser={authUser} />
            <div className="flex-1 p-5 overflow-auto">{children}</div>
          </div>
        </div>
      );
    }
  }, [authUser, loading, children]);

  return layout;
};

export default AuthenticatedLayout;
