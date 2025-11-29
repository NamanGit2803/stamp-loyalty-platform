'use client'

import React from 'react'

const Illustration = () => {
    return (
        <div className="hidden md:flex w-3/5 flex-col justify-center px-16">

            {/* TEXT ABOVE ILLUSTRATION */}
            <div className="mb-10">
                <h2 className="text-4xl font-bold text-secondary leading-tight">
                    Grow Your Business<br />With Confidence
                </h2>

                <p className="text-gray-600 text-lg mt-4">
                    Smart tools that help your shop grow every day.
                </p>
            </div>

            {/* ILLUSTRATION */}
            <img
                src="/sign-up.svg"
                alt="Signup Illustration"
                className="w-4/5 max-w-xl drop-shadow-md"
            />
        </div>
    )
}

export default Illustration