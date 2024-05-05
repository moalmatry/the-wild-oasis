import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      // to force page to reload we did not use navigate from react dom (old solution)
      // window.location.replace("/");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Email or password is incorrect");
    },
  });

  return { login, isLoading };
};
