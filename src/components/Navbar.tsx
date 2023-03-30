import React from "react";
import { signIn, signOut } from "next-auth/react"
import Image from "next/image";

const Navbar = ({ user }: any) => {

    if (user) {
        return (
            <>

                <div className=" justify-end pr-4 py-4 flex lg:pr-4">

                    <div className="flex items-center space-x-4 mr-4">

                        <Image src={user?.image} className="w-10 h-10 rounded-full" width={10} height={10} alt="profile image" />
                        <div className="font-medium dark:text-white">
                            <div>{user?.name}</div>
                            <div className="text-sm text-white">{user?.email}</div>
                        </div>
                    </div>

                    <button
                        className="text-white hover:text-primary p-2 lg:px-4 md:mx-2  rounded bg-indigo-600"
                        onClick={() => signOut()}
                    >
                        Log out
                    </button>
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <div className=" justify-end pr-4 py-4 flex lg:pr-4">
                    <button
                        className="class-for-login-button-introjs text-white hover:text-primary p-2 lg:px-4 md:mx-2  rounded bg-indigo-600"
                        onClick={() => signIn()}
                    >
                        Login
                    </button>
                </div>
            </>
        )
    }

}
export default Navbar;