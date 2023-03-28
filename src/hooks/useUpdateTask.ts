import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface variablesType {
  value?: string;
  id: string;
  completed?: boolean;
}

export default function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: variablesType) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/updateTodos`,
        {
          id: variables.id,
          value: variables.value,
          completed: variables.completed,
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
