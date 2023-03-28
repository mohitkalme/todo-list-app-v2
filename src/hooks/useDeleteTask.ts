import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface variablesType {
  id: string;
}

export default function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: variablesType) => {
      const { data } = await axios.post(
        "http://localhost:3000/api/deleteTodo",
        {
          id: variables.id,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTodos"], {
        exact: true,
      });
    },
  });
}
