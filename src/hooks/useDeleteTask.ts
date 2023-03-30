import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { task } from "@/pages";

interface variablesType {
  id: string;
}

export default function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: variablesType) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/deleteTodo`,
        {
          id: variables.id,
        }
      );
      return data;
    },
    onMutate: async (variables) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries({ queryKey: ["allTodos"] });

      const previousData = queryClient.getQueryData(["allTodos"]);
      // Create optimistic todo
      const optimisticTodo: variablesType = {
        id: variables.id,
      };

      // Add optimistic todo to todos list
      queryClient.setQueryData(["allTodos"], (old: any) => {
        const newData = old.tasks.filter(
          (todo: task) => todo.id !== optimisticTodo.id
        );

        return {
          tasks: newData,
        };
      });
      // Return context with the optimistic todo
      return { previousData };
    },
    onError: (error, variables, context) => {
      // An error happened!

      queryClient.setQueryData(["allTodo"], context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allTodos"], {
        exact: true,
      });
    },
  });
}
