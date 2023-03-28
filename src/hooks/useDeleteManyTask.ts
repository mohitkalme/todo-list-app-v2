import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//react-toastify
import { toast } from "react-toastify";

interface variablesType {
  userId: string;
}

export default function useDeleteManyTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: variablesType) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/deleteMany`,
          {
            userId: variables.userId,
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
