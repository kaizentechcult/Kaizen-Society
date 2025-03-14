"use client"

import { useAuth } from "@/contexts/AuthContext";
import LoginButton from "../LoginButton";
import { motion } from 'framer-motion';



const SignUp = () => {
    const { user } = useAuth();
    return (

        <>
            {!user && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex justify-between items-center"
                >
                    <p className="text-zinc-400">
                        Sign in to sync your progress across devices
                    </p>
                    <LoginButton />

                </motion.div>
            )
            }
        </>
    )
}

export default SignUp;