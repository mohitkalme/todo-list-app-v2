import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { task } from "@/pages";

function useFetchAllTask(tasks: task[]) {
  return useQuery({
    queryKey: ["allTodos"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}api/allTodos`
      );
      return data;
    },
    initialData: tasks,
  });
}

export default useFetchAllTask;
