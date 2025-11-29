"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Illustration from "./signup/Illustration"
import Form from "./signup/Form"

export default function SignupForm() {

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-blue-50 to-white">
      
      {/* LEFT ILLUSTRATION SECTION */}
      <Illustration/>

      {/* RIGHT SIGNUP CARD */}
      <Form/>
    </div>
  )
}
