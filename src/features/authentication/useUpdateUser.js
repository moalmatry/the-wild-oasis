import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Updated Successfully");
      queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return { updateUser, isUpdating };
};
