'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Lock, Eye, EyeOff, CheckCircle, TriangleAlert } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"



const ChangePasswordDialog = () => {

    const { shopStore, userStore } = useStore()
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    })
    const [errors, setErrors] = useState({})

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPasswordData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // reset all fields 
    const resetPasswordFields = () => {
        setPasswordData({ current: "", new: "", confirm: "" })
        setShowPassword({ current: false, new: false, confirm: false })
    }

    const validate = () => {
        const newErrors = {}
        if (!passwordData.current.trim()) newErrors.current = "Current password is required"
        if (!passwordData.new.trim()) newErrors.new = "New password is required"
        if (!passwordData.confirm.trim()) newErrors.confirm = "Confirm password is required"
        if (passwordData.new.trim().length < 6) newErrors.new = "Password must be 6+ characters"
        if (passwordData.confirm.trim().length > 0 && passwordData.new !== passwordData.confirm) newErrors.confirm = "New and confirm passwords do not match."
        return newErrors
    }

    // handle change password 
    const handleChangePassword = async () => {

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        await userStore.updateProfile({
            currentPassword: passwordData.current,
            newPassword: passwordData.new,
        })

        if (userStore.error) {
            toast.error(userStore.error)
        } else {
            toast.success("Password updated successfully.")
            resetPasswordFields()
            setPasswordDialogOpen(false)
        }
    }

    const handleDialogChange = (open) => {
        setPasswordDialogOpen(open)
        if (!open) resetPasswordFields()
    }

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    return (
        <Dialog open={passwordDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and set a new one
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Current Password */}
                    <div className="space-y-1">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="current-password"
                                type={showPassword.current ? "text" : "password"}
                                value={passwordData.current}
                                name="current"
                                onChange={handleChange}
                                className={errors.current ? "border-red-500 pr-10" : "border-border"}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("current")}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword.current ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.current && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.current}</p>}
                    </div>

                    {/* New Password */}
                    <div className="space-y-1">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                            <Input
                                id="new-password"
                                type={showPassword.new ? "text" : "password"}
                                value={passwordData.new}
                                name="new"
                                placeholder="Minimum 6 characters"
                                onChange={handleChange}
                                className={errors.new ? "border-red-500 pr-10" : "border-border"}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("new")}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword.new ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.new && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.new}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showPassword.confirm ? "text" : "password"}
                                value={passwordData.confirm}
                                name="confirm"
                                placeholder="Minimum 6 characters"
                                onChange={handleChange}
                                className={errors.confirm ? "border-red-500 pr-10" : "border-border"}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword("confirm")}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword.confirm ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirm && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.confirm}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 justify-end pt-2">
                        <Button
                            variant="outline"
                            onClick={() => { setPasswordDialogOpen(false), resetPasswordFields() }}
                        >
                            Cancel
                        </Button>
                        <Button disabled={userStore.loading} onClick={handleChangePassword}>
                            {userStore.loading ? <><Spinner/>Changing...</> : 'Change Password'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default observer(ChangePasswordDialog)
