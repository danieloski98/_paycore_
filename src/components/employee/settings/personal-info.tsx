"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAtom } from 'jotai'
import { employeeAtom } from '@/states/auth-user-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { userTypeAtom } from '@/states/user-type-state'
import { useRef, useState } from 'react'
import useForm from '@/hooks/use-form'
import { userSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { useUpdateEmployeePicture } from '@/hooks/use-employees'
import { toast } from 'sonner'

const PersonalInfo = () => {
    const [user, setUser] = useAtom(employeeAtom)
    const fileRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState(
        user?.picture ?? ""
    );

    const { mutate: updatePicture, isPending } =
        useUpdateEmployeePicture();

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // preview immediately
        
        updatePicture(
            {
                id: user?.id!,
                file,
            },
            {
                onSuccess: () => {
                    setPreview(URL.createObjectURL(file));
                    toast.success("Profile picture updated");
                },
                onError: (err: any) => {
                    toast.error(err.message);
                },
            }
        );
    };

    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     watch,
    //     renderForm,
    // } = useForm({
    //     resolver: userSchema,
    //     mode: "onChange",
    //     defaultValues: {},
    // });

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your contact details and identity information.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className='space-y-10 pt-4'>
                <div className='flex gap-10'>
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileRef.current?.click()}>
                            <AvatarImage src={user?.picture ?? ""} />

                            <AvatarFallback>
                                {user?.firstName?.[0]}
                                {user?.lastName?.[0]}
                            </AvatarFallback>
                        </Avatar>

                        <input
                            hidden
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="grid gap-y-6 gap-x-14  md:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</label>
                            <p className="text-sm font-medium mt-2">{user?.firstName} {user?.lastName}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Employee Position</label>
                            <p className="text-sm font-medium mt-2">{user?.position}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-sm font-medium">{user?.email}</p>
                                <Badge variant="outline" className="text-xs">{user?.emailVerified ? "VERIFIED" : "NOT VERIFIED"}</Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Department</label>
                            <p className="text-sm font-medium mt-2">{user?.department}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                            <p className="text-sm font-medium mt-2">{user?.phone}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PersonalInfo