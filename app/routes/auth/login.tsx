import { Fieldset } from "@headlessui/react";
import { KeyRound, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLoginUserMutation } from "~/apiHooks/useLoginUserMutation";
import { PrimaryButton } from "~/components/base/Buttons";
import { InputComponent } from "~/components/base/InputComponent";
import { LinkTo } from "~/components/base/Links";
import { WebSocketTest } from "~/components/WebSocketTest";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { isPending, mutate } = useLoginUserMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: () => {
          setError(true);
        },
      },
    );
  };

  const handleChange = () => {
    if (error) setError(false);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.style.background = "white";
  }, []);

  return (
    <div className="h-full">
      <div className="mb-10">
        <h1 className="text-tertiary mb-2 text-center text-4xl font-extrabold">
          Sign in to <span className="text-primary">Wink</span>
        </h1>
        <p className="text-tertiary/60 text-center">Enter your credentials to continue</p>
      </div>
      <form method="post" className="flex flex-col gap-4" onSubmit={handleLogin}>
        <Fieldset className="flex flex-col gap-4">
          <InputComponent
            icon={Mail}
            label="E-mail address"
            type="text"
            name="email"
            placeholder="your-company@email.com"
            className="rounded-md bg-white/20 p-1"
            error={error}
            onChange={handleChange}
            autoComplete="email"
          />
          <InputComponent
            icon={KeyRound}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-md bg-white/20 p-1"
            error={error}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <LinkTo to="#" intent="tertiary" size="small" className="self-end text-right">
            Forgot your password?
          </LinkTo>
        </Fieldset>
        <PrimaryButton type="submit" label="Login" isLoading={isPending} className="shadow-primary/30 shadow-xl" />
      </form>
      <p className="text-tertiary mt-8 text-center">
        New to Wink? <LinkTo to="/register">Create an account instead</LinkTo>.
      </p>
    </div>
  );
}
