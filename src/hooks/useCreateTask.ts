import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//react-toastify
import { toast } from "react-toastify";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: { value: string }) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/createTodos`,
          {
            value: variables.value,
          }
        );
        return data;
      } catch (error: any) {
        toast.error(`${error.response.data.message}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTodos"], {
        exact: true,
      });
    },
  });
}
