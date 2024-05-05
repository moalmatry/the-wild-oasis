import { useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1) Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 3) if there is no authenticated user , redirect to login

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  // 2) Show Spinner

  if (isLoading && !isAuthenticated)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4) if there is a user , render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
