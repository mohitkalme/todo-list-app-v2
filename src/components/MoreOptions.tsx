import styles from "./MoreOptions.module.css";

//react
import { useRef } from "react";

//next
import Image from "next/image";

//hooks
import useDeleteTask from "@/hooks/useDeleteTask";


type MoreOptionsType = {
    taskId: string;
    setIsEditing: (value: boolean) => void
}


export default function MoreOptions({ taskId, setIsEditing }: MoreOptionsType) {

    const { mutate } = useDeleteTask();

    const popupRef = useRef<HTMLDivElement>(null);

    function handleChange(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        const allDropdown = document.querySelectorAll(`.${styles.dropdown}`);
        allDropdown.forEach(element => {
            if (element.classList.contains(`${styles.open}`)) {
                element.classList.remove(`${styles.open}`)
            }
        })
        popupRef.current?.classList.add(`${styles.open}`);
    }

    function handleDropdownEditAction(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setTimeout(() => {

            popupRef.current?.classList.remove(`${styles.open}`);
        }, 50);
        setIsEditing(true)
    }
    function handleDropdownDeleteAction(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setTimeout(() => {

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
        <>

            <div className={styles.moreOptionsContainer}>
                <div className={styles.dropdown} ref={popupRef}>
                    <div className={styles.dropdownItem} onClick={handleDropdownEditAction}>
                        <button className={styles.dropdownButton}>

                            <Image

                                src="/icons/EditOutLinedIcon.svg"
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
                                src="/icons/DeleteOutlinedIcon.svg"
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
                            src="/icons/MoreVertIcon.svg"
                            alt="three vertical dots"
                            className="w-[24px] h-[24px]"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
