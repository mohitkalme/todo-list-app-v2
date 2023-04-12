import React from "react";
import { createPortal } from 'react-dom';

import styles from './Form.module.css';

import useCreateTask from "@/hooks/useCreateTask";

//uuid
import { v4 as uuidv4 } from 'uuid';

//next-auth
import { useSession } from "next-auth/react"

//react-toastify
import { toast } from "react-toastify";

//components 
import Spinner from "@/components/Spinner";

let domNode: HTMLElement;

if (typeof window !== "undefined") {
    domNode = document.getElementById('spinner-section') as HTMLElement;
}


export default function Form() {
    const [todoText, setTodoText] = React.useState("");

    const { data: session } = useSession()

    const { mutate, isLoading } = useCreateTask();

    function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLDivElement>) {
        e.preventDefault();
        if (!todoText.trim()) {
            return;
        }

        if (!session) {
            toast.error(`You must be logged in.`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTodoText("");
            return
        }
        mutate({
            id: uuidv4(),
            value: todoText,
            completed: false
        })
        setTodoText("");
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setTodoText(e.currentTarget.value);
    }

    return (
        <>

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
                    disabled={isLoading}
                />


            </form>
            {isLoading && createPortal(
                <Spinner />,
                domNode

            )}
        </>
    );
}