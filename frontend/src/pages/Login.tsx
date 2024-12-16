import { LoginParams, SignupParams } from "@/components/AuthProvider";
import { ButtonProps, FormCard, FormCardButtons } from "@/components/FormCard";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { z } from "zod";

type LoginPageProps = {
  isSignup?: boolean;
};

function LoginPage({ isSignup }: LoginPageProps) {
  const [location, setLocation] = useLocation();
  const { login, signup } = useAuth();

  // TODO: move this to shared libs
  const loginSchema = useMemo(() => {
    return z.object({
      username: z.string(),
      password: z.string(),
    });
  }, []);

  // TODO: move this to shared libs
  const signupSchema = useMemo(() => {
    return z.object({
      email: z.string().email(),
      username: z.string(),
      password: z.string(),
    });
  }, []);

  const defaultValues = useMemo(() => {
    const values: Record<string, string> = {
      username: "",
      password: "",
    };

    if (isSignup) values.email = "";
  }, [isSignup]);

  const redirect = useCallback(
    (href: string) => {
      setLocation(href);
    },
    [setLocation],
  );

  const onLoginClick = useCallback(
    (setFormError: (msg: string | null) => void, params: LoginParams) => {
      if (isSignup && location !== "/login") {
        redirect("/login");
      } else {
        login(setFormError, params);
      }
    },
    [isSignup, login, redirect, location],
  );

  const onSignupClick = useCallback(
    (setFormError: (msg: string | null) => void, params: SignupParams) => {
      if (isSignup) {
        signup(setFormError, params);
      } else if (location !== "/signup") {
        redirect("/signup");
      }
    },
    [isSignup, signup, redirect, location],
  );

  const buttons = useMemo(() => {
    const buttons: Partial<FormCardButtons> = {};

    const signupButton = {
      label: "Sign Up",
      onClick: onSignupClick,
    } satisfies ButtonProps;

    const loginButton = {
      label: "Log In",
      onClick: onLoginClick,
    } satisfies ButtonProps;

    if (isSignup) {
      buttons.primary = signupButton;
      buttons.secondary = loginButton;
    } else {
      buttons.primary = loginButton;
      buttons.secondary = signupButton;
    }

    buttons.secondary.className =
      "w-1/3 bg-bg-000 text-primary-900 hover:bg-bg-200";
    buttons.primary.className = "w-1/3";

    return buttons;
  }, [isSignup, onLoginClick, onSignupClick]);

  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] items-center justify-center">
      <FormCard
        className={"flex flex-col justify-center items-start p-4 min-w-[400px]"}
        title={isSignup ? "Sign Up" : "Log In"}
        description={isSignup ? "Create an account" : "Log in to your account"}
        zodSchema={isSignup ? signupSchema : loginSchema}
        defaultValues={defaultValues}
        buttons={buttons as FormCardButtons}
      />
    </div>
  );
}

export default LoginPage;
