import Header from "@/app/components/Header/Header";
import {useAuth} from "@/app/lib/authContext";
import {Loading} from "@/app/components/Loading";

const AuthenticatedLayout = ({ children }) => {
  const { authUser, loading } = useAuth();
  return (
    <>
      {loading ? <Loading/> :
        authUser && (
          <div className="auth-layout">
            <Header authUser={authUser}/>
            {children}
          </div>
        )}
    </>
)
}

export default AuthenticatedLayout
