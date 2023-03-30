import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { task } from "@/pages";

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

    onMutate: async (variables) => {
      // Cancel current queries for the todos list

      await queryClient.cancelQueries({ queryKey: ["allTodos"] });

      const previousData = queryClient.getQueryData(["allTodos"]);
      // Create optimistic todo
      const optimisticTodo: variablesType = {
        id: variables.id,
      };
      if (variables.value) {
        optimisticTodo.value = variables.value;
      } else {
        optimisticTodo.completed = variables.completed;
      }
      // Add optimistic todo to todos list
      queryClient.setQueryData(["allTodos"], (old: any) => {
        const newData = old.tasks.map((todo: task) => {
          if (todo.id === optimisticTodo.id) {
            return {
              ...todo,
              ...optimisticTodo,
            };
          } else {
            return todo;
          }
        });
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
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries(["allTodos"], {
        exact: true,
      });
    },
  });
}
