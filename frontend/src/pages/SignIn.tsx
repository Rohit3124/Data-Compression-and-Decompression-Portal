import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import Joi from "joi";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { currentUserContext } from "../context/userContext";
import dataCompressionImage from "@/assets/dataCompressImg.webp";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface SignInFormInputs {
  email: string;
  password: string;
}

const schema = Joi.object({
  email: Joi.string().required().empty("").messages({
    "string.base": "Email must be a text value.",
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(100).required().empty("").messages({
    "string.base": "Password must be a text value.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password cannot exceed 100 characters.",
    "any.required": "Password is required.",
  }),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(currentUserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const res = await fetch(`${backendUrl}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        return alert("Something went wrong");
      }
      setCurrentUser(responseData);

      navigate("/");
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      alert(error?.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-20">
        <div className="hidden md:block flex-1">
          <img
            src={dataCompressionImage}
            alt=""
            className="border rounded-lg h-80 w-96"
          />
        </div>
        <div className="flex-1">
          <div className="text-center">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text text-3xl">
              Data Compression and Decompression Tool
            </span>
            <p className="text-lg mt-5 mb-8 font-normal">
              Sign in with your email, password, or Google account.
            </p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label>Your Email</Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <div>
              <Label>Your Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
