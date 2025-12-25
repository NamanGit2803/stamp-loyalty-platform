import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import  ChangePasswordDialog  from './password/password-change-dialog'
import { Lock } from 'lucide-react';

const PasswordCard = () => {
    return (
        <Card className='bg-amber-50'>
            <CardHeader className='flex items-center gap-2'>
                <Lock className='text-primary size-4'/>
                <CardTitle className='text-primary'>Security</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <Label className='mb-1'>Password</Label>
                    <Input type="password" value="************" disabled />
                </div>

                <ChangePasswordDialog/>

                <Separator />

                <div>
                    <p className="text-sm text-muted-foreground">
                        Set a new password to protect your account.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default PasswordCard