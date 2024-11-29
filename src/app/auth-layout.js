import Header from "@/app/components/Header/Header";
import {AuthProvider, useAuth} from "@/app/lib/authContext";

const AuthenticatedLayout = ({ children, authUser: propAuthUser }) => {
  const { authUser: contextAuthUser } = useAuth(); // Rename the variable from context

  // Decide which authUser to use (e.g., prioritizing the prop over the context)
  const user = propAuthUser || contextAuthUser;

  return (
    <div className="auth-layout">
      <AuthProvider>
        <Header authUser={user} />
        {children}
      </AuthProvider>
    </div>
  )
}

export default AuthenticatedLayout
