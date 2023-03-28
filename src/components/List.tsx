import React from "react";
import { motion } from 'framer-motion'
import iconCheck from "../images/icon-check.svg";
import styles from './List.module.css'
import MoreOptions from "./MoreOptions";
import EditList from "./EditList";
import Image from "next/image";
import { useState } from "react";


import { task } from "@/pages";

import useUpdateTask from "@/hooks/useUpdateTask";

type ListProps = {
    task: task
}
export default function List({ task }: ListProps) {


    const [isEditing, setIsEditing] = useState(false);

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 40,
    };

    const { mutate } = useUpdateTask();
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
                    <EditList task={task.value} taskId={task.id} setIsEditing={setIsEditing} isEditing />

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
                                    src={iconCheck}
                                    className="w-[26px] h-[17px]"
                                    alt="icon check"
                                />
                            </div>
                        </div>

                        <p
                            id={task.completed ? styles.strike : ""}
                            className="break-all bg-very-light-gray text-input-text-light m-0 flex-1 ml-2 sm:ml-3 mr-2 text-base font-normal border-0 outline-0"
                        >
                            {task.value}
                        </p>

                        <MoreOptions taskId={task.id} setIsEditing={setIsEditing} isEditing />
                    </>
                )}
            </div>
        </motion.div>
    );
}