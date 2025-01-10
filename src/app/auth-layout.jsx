import Header from "@/app/components/Header/Header";
import {useAuth} from "@/app/lib/authContext";
import {Loading} from "@/app/components/Loading";
import {Sidebar} from "@/app/components/General/Sidebar";
import {Image} from "@nextui-org/image";

const AuthenticatedLayout = ({ children }) => {
  const { authUser, loading } = useAuth();
  return (
    <>
      {loading ? <Loading/> :
        authUser && (
          <div className="auth-layout flex h-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
              <Header authUser={authUser}/>
              {/*<div className="flex items-center justify-between h-20 p-5">*/}
              {/*  <div className="text-2xl font-bold">Members</div>*/}
              {/*  <a href="" className="flex justify-between items-center w-52">*/}
              {/*    <Image*/}
              {/*      className="w-5 h-5"*/}
              {/*      alt="Plus sign"*/}
              {/*      src={`/icons/plus.svg`}*/}
              {/*    />*/}
              {/*    <div className="text-themeSecondary text-base font-semibold">Register new member</div>*/}
              {/*  </a>*/}
              {/*</div>*/}
              <div className="flex-1 p-5 overflow-auto">{children}</div>
            </div>
          </div>
        )}
    </>
  )
}

export default AuthenticatedLayout
