
import styles from "./EditList.module.css";

import { useEffect, useRef, useState } from "react";

import useUpdateTask from "@/hooks/useUpdateTask";


type EditListProps = {
    task: string;
    taskId: string;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void
}
// setIsEditing
export default function EditList({ task, taskId, setIsEditing, isEditing }: EditListProps) {
    const [text, setText] = useState(task);

    const { mutate } = useUpdateTask();


    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleCancel() {
        // dispatch(editTodo(taskId));
        setIsEditing(false)
    }
    function handleSave() {
        // dispatch(
        //     updateEditedTodo({
        //         taskId,
        //         text,
        //     })
        // );
        mutate({
            id: taskId,
            value: text
        })

        setIsEditing(false)
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className={styles.editListContainer}>
            <div className={styles.editTotoUnderline}>
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    ref={inputRef}
                    className={styles.editTodoInput}
                    value={text}
                />
            </div>
            <div className="flex justify-end pt-4 gap-4">

                <button onClick={handleCancel} className="h-10 px-6 font-semibold rounded-md bg-blue-100 text-black" type="submit">
                    Cancel
                </button>

                <button onClick={handleSave} className="h-10 px-6 font-semibold rounded-md bg-blue-400 text-white" type="submit">
                    Save
                </button>

            </div>
        </form>
    );
}
