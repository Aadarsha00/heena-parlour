import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../../interface/auth.interface";
import { registerSchema } from "../../schema/auth.schema";
import { registerUser } from "../../api/auth.api";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login"); // redirect to login after signup
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block font-medium">Username</label>
        <input {...register("username")} className="w-full border px-3 py-2" />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      <div>
        <label className="block font-medium">Confirm Password</label>
        <input
          type="password"
          {...register("re_password")}
          className="w-full border px-3 py-2"
        />
        <p className="text-red-500 text-sm">{errors.re_password?.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            {...register("first_name")}
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            {...register("last_name")}
            className="w-full border px-3 py-2"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">Registration failed</p>}

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
