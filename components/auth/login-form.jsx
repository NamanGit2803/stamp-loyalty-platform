"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Illustration from "../Illustration"
import Form from "./login/Form"

export default function LoginForm() {

  return (
    <div className="min-h-screen w-full flex bg-custom-gradient">
      {/* left side  */}
      <Illustration imageSrc={'/plan2.png'} title={'Secure login. Seamless experience.'} />
      
      {/* right side  */}
      <Form/>
    </div>
  )
}
