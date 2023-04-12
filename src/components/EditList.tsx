
import styles from "./EditList.module.css";

//react 
import { useEffect, useRef, useState } from "react";

//hooks
import useUpdateTask from "@/hooks/useUpdateTask";


type EditListProps = {
    task: string;
    taskId: string;
    setIsEditing: (value: boolean) => void
}

export default function EditList({ task, taskId, setIsEditing }: EditListProps) {
    const [text, setText] = useState(task);

    const { mutate } = useUpdateTask();


    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault()
        setIsEditing(false)
    }
    function handleSave(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault()
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
