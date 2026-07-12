"use client"

import { useEffect, useRef, useState } from 'react'
import { Download, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { useAtom } from 'jotai'
import { AuthUser, authUserAtom } from '@/states/auth-user-state'
import { useModal } from '@/hooks/use-modal'
import { useUpdateUser, useUpdateUserPicture } from '@/hooks/use-user'
import { useUploadImage } from '@/hooks/use-upload' // or useUploadCompanyLogo, whichever generic upload hook you kept
import { toast } from 'sonner'

const ROLE_LABELS: Record<AuthUser["role"], string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Administrator",
    USER: "User",
    EMPLOYEE: "Employee",
}

const CompanyUser = () => {
    const [user, setAuthUser] = useAtom(authUserAtom);
    const { openModal } = useModal()

    // const { mutate: updateUser, isPending: isSavingPhoto } = useUpdateUser(user?.id ?? "")

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: updateUserPicture, isPending: isSavingPicture } = useUpdateUserPicture();
    const [picturePreview, setPicturePreview] = useState<string | undefined>();

    useEffect(() => {
        setPicturePreview(user?.picture ?? undefined);
    }, [user]);

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file || !user?.id) return;

        const localPreview = URL.createObjectURL(file);
        setPicturePreview(localPreview);

        updateUserPicture(
            { userId: user.id, file },
            {
                onSuccess(picture) {
                    setPicturePreview(picture);
                    if (user) {
                        setAuthUser({ ...user, picture }); // 👈 include the new value, not just a copy of the old object
                    }
                    toast.success("Photo updated");
                },
                onError(error: any) {
                    toast.error(error?.response?.data?.message ?? error?.message ?? "Unable to update photo");
                    setPicturePreview(user?.picture ?? undefined);
                },
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* User */}
            <Card>
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle className="text-base">USER</CardTitle>
                    <Button onClick={() => openModal("edit-user", user)}>Edit</Button>
                </CardHeader>
                <CardContent className="space-y-4 mt-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">

                            <Avatar className="h-24 w-24">
                                <AvatarImage src={picturePreview ?? user?.picture ?? undefined} />
                                <AvatarFallback>
                                    {user?.firstName?.[0]}
                                    {user?.lastName?.[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="space-y-1">

                                <h3 className="font-semibold text-lg">
                                    {user?.firstName} {user?.lastName}
                                </h3>

                                <Badge variant="secondary">
                                    {user?.role ? ROLE_LABELS[user.role] : "—"}
                                </Badge>

                                <p className="text-muted-foreground text-sm">
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePictureChange}
                        />

                        <Button
                            variant="outline"
                            disabled={isSavingPicture}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {isSavingPicture ? (
                                <Spinner data-icon="inline-start" />
                            ) : (
                                <Upload className="mr-2 h-4 w-4" />
                            )}
                            {isSavingPicture ? "Uploading..." : isSavingPicture ? "Saving..." : "Upload Photo"}
                        </Button>

                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <Card>
                <CardContent className="pt-6 space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Company Data
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        size="sm"
                    // onClick={() => openModal("deactivate-account", user)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deactivate Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default CompanyUser