import Header from "@/app/components/Header/Header";

const AuthenticatedLayout = ({ children, authUser }) => {
  return (
    <div className="auth-layout">
      <Header authUser={authUser} />
      {children}
    </div>
  )
}

export default AuthenticatedLayout
