import Header from "@/app/components/Header/Header";

const AuthenticatedLayout = ({ children, metadata, authUser }) => {
  return (
    <div className="auth-layout">
      <Header authUser={authUser} />
      {/* Components specific to authenticated layout, like sidebar or navigation */}
      {children}
    </div>
  );
}

export default AuthenticatedLayout
