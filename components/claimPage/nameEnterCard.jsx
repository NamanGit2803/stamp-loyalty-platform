'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

export default function NameEnterCard({ shopName, customerId, setUIState }) {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const addName = async () => {
        // if (!customerId) {
        //     toast.error('User not found!')
        //     return
        // }

        setLoading(true)

        try {
            const res = await fetch("/api/public/addCustomerName", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customerId, name }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
        } catch (error) {
            toast.error(error)
        }

        toast.success("Name has been updated successfully")
        setUIState('success')


    }

    return (
        <Card className="w-full shadow-md mx-auto border border-border/50 overflow-hidden max-w-sm bg-white rounded-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl text-primary">
                    Enter Your Name
                </CardTitle>
            </CardHeader>

            <CardContent className="text-center text-muted-foreground text-sm leading-relaxed space-y-6">
                <p>
                    Welcome to the <span className="logo-font text-primary">Stampi</span> reward journey! 🎉<br />
                    You're now joining the loyalty account of <br /><span className="text-primary font-semibold">{shopName ?? 'shop'}</span>.<br />
                    To begin collecting your stamps, please enter your sweet name — only once!
                </p>

                <div className="text-left space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-primary">Your Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            className="rounded-md"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>

                    <Button className="w-full text-base py-5 rounded-md" size="sm" disabled={loading} onClick={()=>{addName()}}>
                        {loading ? <><Spinner/> Updating...</> : 'Continue'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
