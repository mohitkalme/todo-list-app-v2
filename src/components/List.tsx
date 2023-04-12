import styles from './List.module.css'

//react
import React, { useState } from "react";
import { createPortal } from 'react-dom';

import { motion } from 'framer-motion'

//components
import MoreOptions from "./MoreOptions";
import EditList from "./EditList";
import Spinner from "./Spinner";

//nextjs
import Image from "next/image";


//hooks
import useUpdateTask from "@/hooks/useUpdateTask";

import type { task } from "@/pages";

type ListProps = {
    task: task
}

let domNode: HTMLElement;

if (typeof window !== "undefined") {
    domNode = document.getElementById('spinner-section') as HTMLElement;
}

export default function List({ task }: ListProps) {


    const [isEditing, setIsEditing] = useState(false);

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 40,
    };

    const { mutate, isLoading, isIdle } = useUpdateTask();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        mutate({
            id: task.id,
            completed: !task.completed
        })
    }


    return (
        <motion.div
            layout
            transition={spring}
        >
            <div className="list-parent relative cursor-pointer flex items-center border border-solid border-transparent border-b-light-border-b bg-very-light-gray p-3 sm:py-[18px] sm:px-[8px] pl-1 sm:pr-4">

                {isEditing ? (
                    <EditList task={task.value} taskId={task.id} setIsEditing={setIsEditing} />

                ) : (
                    <>
                        <div className="overflow-hidden relative w-5 h-5 sm:w-7 sm:h-7  outline-2 outline outline-hover-light-grayish-blue hover:outline-light-grayish-blue rounded-[50%] ">
                            <input
                                type="checkbox"
                                defaultChecked={task.completed}
                                onChange={handleChange}
                                className={`${styles.listCheckbox} " cursor-pointer border-none outline-0 opacity-0 pointer-events-auto w-full h-full"`}
                            />

                            <div className={`${styles.blueBg} " w-full h-full rounded-full flex items-center justify-center" `}>
                                <Image
                                    src="/icons/icon-check.svg"
                                    className="w-[26px] h-[17px]"
                                    alt="icon check"
                                    width={26}
                                    height={17}
                                />
                            </div>
                        </div>

                        <p
                            id={task.completed ? styles.strike : ""}
                            className="break-all bg-very-light-gray text-input-text-light m-0 flex-1 ml-2 sm:ml-3 mr-2 text-base font-normal border-0 outline-0"
                        >
                            {task.value}
                        </p>

                        <MoreOptions taskId={task.id} setIsEditing={setIsEditing} />

                        {isLoading && createPortal(
                            <Spinner />,
                            domNode

                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}