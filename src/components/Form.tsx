import React from "react";
import styles from './Form.module.css';

import useCreateTask from "@/hooks/useCreateTask";


export default function Form() {
    const [todoText, setTodoText] = React.useState("");


    const { mutate } = useCreateTask();

    function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLDivElement>) {
        e.preventDefault();
        if (!todoText.trim()) {
            return;
        }

        mutate({
            value: todoText
        })
        setTodoText("");
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setTodoText(e.currentTarget.value);
    }
    return (
        <form
            className="flex items-center rounded-md  shadow-lg bg-very-light-gray p-3 sm:py-[18px] sm:px-[22px]"
            onSubmit={handleSubmit}
        >
            <div
                onClick={handleSubmit}
                className={`cursor-pointer outline-2 outline outline-hover-light-grayish-blue ${todoText.length >= 1 ? styles.blueOutline : ""
                    } w-5 h-5 sm:w-7 sm:h-7 rounded-[50%] `}
            >
                <input
                    type="checkbox"
                    className="cursor-pointer border-none outline-0 opacity-0 w-full h-full"
                />
            </div>

            <input
                className=" bg-transparent text-input-text-light m-0 flex-1 ml-2 sm:ml-5 text-base font-normal border-0 outline-0"
                type="text"
                placeholder="Create a new todo..."
                name="text"
                autoComplete="off"
                value={todoText}
                onChange={handleChange}
            />


        </form>

    );
}