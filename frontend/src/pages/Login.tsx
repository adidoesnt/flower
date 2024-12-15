import { FormCard } from "@/components/FormCard";
import { useCallback, useMemo } from "react";
import { z } from "zod";

function LoginPage() {
  const loginSchema = useMemo(() => {
    return z.object({
      username: z.string().email(),
      password: z.string(),
    });
  }, []);

  const defaultValues = useMemo(() => {
    return {
      username: "",
      password: "",
    };
  }, []);

  const onLoginClick = useCallback(() => {
    console.log("login");
  }, []);

  const onSignupClick = useCallback(() => {
    console.log("signup");
  }, []);

  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] items-center justify-center">
      <FormCard
        className={"flex flex-col justify-center items-start p-4 w-1/2"}
        title="Login"
        description="Please enter your credentials to login"
        zodSchema={loginSchema}
        defaultValues={defaultValues}
        buttons={{
          submit: {
            label: "Log In",
            onClick: onLoginClick,
          },
          cancel: {
            label: "Sign Up",
            onClick: onSignupClick,
          },
        }}
      />
    </div>
  );
}

export default LoginPage;
