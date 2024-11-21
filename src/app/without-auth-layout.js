
export default function WithoutAuthLayout({ children, metadata }) {
  return (
    <div className="without-auth-layout">

      {/* Common layout components for non-authenticated pages, e.g., header */}
      {children}
    </div>
  );
}
