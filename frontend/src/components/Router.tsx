import { useAuth } from "@/hooks/useAuth";
import LoginPage from "@/pages/Login";
import { Route } from "wouter";

const AuthenticatedRoutes = () => {
  return <Route path="/" />;
};

const UnauthenticatedRoutes = () => {
  return (
    <>
      <Route path="/" component={LoginPage.bind(null, { isSignup: false })} />
      <Route
        path="/login"
        component={LoginPage.bind(null, { isSignup: false })}
      />
      <Route
        path="/signup"
        component={LoginPage.bind(null, { isSignup: true })}
      />
    </>
  );
};

export const Router = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};
