import axios from "axios";

//react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";

//react-toastify
import { toast } from "react-toastify";

export default function useCreateTask() {
  const queryClient = useQueryClient();

  interface variablesType {
    id: string;
    value: string;
    completed: boolean;
  }
  return useMutation({
    mutationFn: async (variables: variablesType) => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/createTodos`,
          {
            id: variables.id,
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
    onMutate: async (variables) => {
      // Cancel current queries for the todos list
      await queryClient.cancelQueries({ queryKey: ["allTodos"] });

      const previousData = queryClient.getQueryData(["allTodos"]);
      // Create optimistic todo
      const optimisticTodo = {
        id: variables.id,
        value: variables.value,
        completed: variables.completed,
      };
      // Add optimistic todo to todos list
      queryClient.setQueryData(["allTodos"], (old: any) => {
        return {
          tasks: [optimisticTodo, ...old.tasks],
        };
      });
      // Return context with the optimistic todo
      return { previousData };
    },

    onError: (error, variables, context) => {
      // An error happened!

      queryClient.setQueryData(["allTodo"], context?.previousData);
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["allTodos"], {
        exact: true,
      });
    },
  });
}
