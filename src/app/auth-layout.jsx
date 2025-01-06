import Header from "@/app/components/Header/Header";
import {useAuth} from "@/app/lib/authContext";
import {Loading} from "@/app/components/Loading";
import {Sidebar} from "@/app/components/General/Sidebar";

const AuthenticatedLayout = ({ children }) => {
  const { authUser, loading } = useAuth();
  return (
    <>
      {loading ? <Loading/> :
        authUser && (
          <div className="auth-layout flex">
            <Sidebar/>
            <div className="flex-1">
              <Header authUser={authUser}/>
              <div className="p-4">{children}</div>
            </div>
          </div>
        )}
    </>
  )
}

export default AuthenticatedLayout
