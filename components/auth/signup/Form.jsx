'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Step1 from './Step1'
import Step2 from './Step2'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const Form = () => {

    const { userStore, planStore } = useStore()
    const [step, setStep] = useState(1)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('signupStep')) {
            setStep(localStorage.getItem('signupStep'))
        }

        if (!userStore.user) {
            localStorage.removeItem('signupStep')
        }

        planStore.loadPlans()


    }, [])

    const setLocalStorage = () => {
        localStorage.setItem('signupStep', 1)
        setStep(1)
    }


    return (
        <div className="flex w-full md:w-2/5 items-center justify-center p-4 h-screen overflow-y-hidden">
            <Card className="w-full max-w-md shadow-lg border-blue-100 p-0 h-[90%] overflow-y-auto no-scrollbar">
                <div className="p-8">
                    <div className="mb-5">
                        <h1 className="text-3xl font-bold text-secondary mb-2">
                            {step == 1 ? "Create Account" : "Enter Shop Details"}
                        </h1>
                        <p className="text-muted-foreground">
                            {step == 1 ? "Join thousands of shopkeepers managing loyalty" : "Provide your shop information to continue."}
                        </p>
                        {step == 2 && userStore.user && <p className='text-muted-foreground text-xs'>
                            Your email: <span className='text-primary'>{userStore.user?.email}</span>
                        </p>}
                    </div>

                    <div className="flex gap-2 mb-7">
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-secondary" : "bg-gray-200"}`}
                            />
                        ))}
                    </div>

                    <div>
                        {step == 1 ? (
                            <Step1 setStep={setStep} />
                        ) : (
                            /* STEP 2 */
                            <Step2 setStep={setStep} />
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        {step == 2 ? 'Want to signup with another email? ' : 'Already have an account? '}
                        {step == 2 ? <span className='hover:cursor-pointer text-primary hover:underline' onClick={setLocalStorage}>Sign up</span>
                            : <Link href="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>}
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default observer(Form)
