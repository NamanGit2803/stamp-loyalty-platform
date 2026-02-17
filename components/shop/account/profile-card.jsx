'use client'

import React from 'react'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from 'mobx'
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { User } from 'lucide-react';

const ProfileCard = () => {

    const { shopStore, userStore } = useStore()
    const [name, setName] = useState("")

    useEffect(() => {
        if (userStore.user?.name) { setName(userStore.user.name) }
    }, [userStore.user?.name])

    // update profile function 
    const updateProfile = async() => {
       await userStore.updateProfile({name: name})

       if(userStore.error){
        toast.error(userStore.error)
       }else{
        toast.success('Name has been updated successfully.')
       }
    }


    return (
        <Card>
            <CardHeader className='flex gap-2 items-center'>
                <User className='text-primary size-5'/>
                <CardTitle className='text-primary'>Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <Label className='mb-1'>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <Label className='mb-1'>Email</Label>
                    <Input value={userStore.user?.email ?? ''} disabled />
                    <p className="text-sm mt-1 text-muted-foreground">
                        Email cannot be changed
                    </p>
                </div>

                <Button disabled={userStore.loading || userStore.user?.name === name} onClick={updateProfile} className="hover:cursor-pointer">{userStore.loading ? <><Spinner /> Saving Changes...</>
                    : 'Save Changes'}</Button>
            </CardContent>
        </Card>
    )
}

export default observer(ProfileCard)