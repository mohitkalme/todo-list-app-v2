import React from "react";
import { signIn, signOut } from "next-auth/react"

const Navbar = ({ session }: any) => {

    if (session) {
        return (
            <>
                {/* Signed in as {session.user?.email} <br />
                Signed in as {session.user?.image} <br />
                Signed in as {session.user?.name} */}


                <div className=" justify-end pr-4 py-4 flex lg:pr-4">
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