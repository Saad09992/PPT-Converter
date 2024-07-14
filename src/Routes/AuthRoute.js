import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { loading, token } = useSelector((state) => state.AuthReducer);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center z-50 w-full h-full fixed top-0 left-0 bg-white bg-opacity-50 ">
          <ProgressSpinner className="custom-spinner" />
        </div>
      )}

      {token ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoutes;
