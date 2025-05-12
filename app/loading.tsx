"use client";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage = () => {
  const override = {
    display: "block",
    margin: "10px auto",
  };
  return (
    <ClipLoader
      color="#3b82F6"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
