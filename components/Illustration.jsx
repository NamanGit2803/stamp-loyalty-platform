'use client'

import React from 'react'

const Illustration = ({ imageSrc, title, subTitle }) => {
    return (
        <div className="hidden md:flex w-3/5 flex-col justify-center p-10">

            {/* TEXT ABOVE BACKGROUND */}
            <div className="mb-5">
                {title && (
                    <h2 className="text-3xl font-bold text-secondary leading-tight">
                        {title}
                    </h2>
                )}

                {subTitle && (
                    <p className="text-muted-foreground text-lg mt-3">
                        {subTitle}
                    </p>
                )}
            </div>

            {/* BACKGROUND ILLUSTRATION */}
            <div
                className="w-full h-full bg-cover bg-center rounded-xl"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                }}
            ></div>

        </div>
    )
}

export default Illustration
