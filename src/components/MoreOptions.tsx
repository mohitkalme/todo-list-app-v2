import MoreVertIcon from "../icons/MoreVertIcon.svg";
import EditOutlinedIcon from "../icons/EditOutlinedIcon.svg";
import DeleteOutlinedIcon from "../icons/DeleteOutlinedIcon.svg";
import styles from "./MoreOptions.module.css";
import { useRef } from "react";
import Image from "next/image";

// import { useDispatch } from "react-redux";
// import { deleteTodo, editTodo } from "../store/todoSlice";
// import IconButton from "@mui/material/IconButton";
import useDeleteTask from "@/hooks/useDeleteTask";

type MoreOptionsType = {
    taskId: string;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void
}

export default function MoreOptions({ taskId, setIsEditing, isEditing }: MoreOptionsType) {
    //   const dispatch = useDispatch();    
    const { mutate } = useDeleteTask();

    const popupRef = useRef<HTMLDivElement>(null);

    function handleChange(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        const allDropdown = document.querySelectorAll(`.${styles.dropdown}`);
        console.log(allDropdown)
        allDropdown.forEach(element => {
            if (element.classList.contains(`${styles.open}`)) {
                element.classList.remove(`${styles.open}`)
            }
        })
        popupRef.current?.classList.add(`${styles.open}`);
    }

    function handleDropdownEditAction(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setTimeout(() => {
            //   dispatch(editTodo(taskId));
            popupRef.current?.classList.remove(`${styles.open}`);
        }, 50);
        setIsEditing(true)
    }
    function handleDropdownDeleteAction(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setTimeout(() => {
            //   dispatch(deleteTodo(taskId));
            mutate({
                id: taskId
            })
            popupRef.current?.classList.remove(`${styles.open}`);

        }, 50);
    }
    function handleButtonFocusChange(e: React.FocusEvent<HTMLButtonElement>) {
        setTimeout(() => {
            if (popupRef.current?.classList.contains(`${styles.open}`)) {
                popupRef.current?.classList.remove(`${styles.open}`);
            }
        }, 250);
    }
    return (
        <div className={styles.moreOptionsContainer}>
            <div className={styles.dropdown} ref={popupRef}>
                <div className={styles.dropdownItem} onClick={handleDropdownEditAction}>
                    <button className={styles.dropdownButton}>

                        <Image

                            src={EditOutlinedIcon}
                            alt="icon of pencil in box"
                            width={20}
                            height={20}
                        />
                        <span className={styles.dropdownText}>Edit</span>
                    </button>
                </div>

                <div className={styles.dropdownItem} onClick={handleDropdownDeleteAction}>
                    <button className={styles.dropdownButton}>

                        <Image
                            src={DeleteOutlinedIcon}
                            alt="icon trash bin"
                            width={20}
                            height={20}
                        />
                        <span className={styles.dropdownText}>Delete</span>
                    </button>
                </div>
            </div>

            <div onClick={handleChange} >
                <button type="button" className="bg-blue-300 opacity-50 w-8 h-8 rounded-full flex items-center justify-center" aria-label="More Options" onBlur={handleButtonFocusChange}>
                    <Image
                        src={MoreVertIcon}
                        alt="three vertical dots"
                        className="w-[24px] h-[24px]"
                    />
                </button>
            </div>
        </div>
    );
}
