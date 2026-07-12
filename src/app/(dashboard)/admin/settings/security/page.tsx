"use client";

import { Eye, EyeOff, Loader, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useForm from "@/hooks/use-form";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/lib/schemas";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useChangePassword } from "@/hooks/use-auth";
import { useAtom, useAtomValue } from "jotai";
import { authUserAtom } from "@/states/auth-user-state";
import { userTypeAtom } from "@/states/user-type-state";

export default function SecuritySettings() {
  const [user] = useAtom(authUserAtom)
  const [userType] = useAtom(userTypeAtom)
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: changePassword, error } = useChangePassword();
  console.log(userType)

  const {
    renderForm,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      isValid,
    },
  } = useForm({
    mode: "onChange",
    resolver: changePasswordSchema,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<
    ChangePasswordFormValues
  > = async (values) => {
    console.log(values);
    changePassword({
      userId: user?.id!,
      newPassword: values.confirmPassword,
      type: userType
    }, {
      onSuccess: () => {
        toast.success("Password updated successfully",
          {
            position: "bottom-right",
          }
        )
      },
      onError: () => {
        toast.error(error?.message ?? "Unable to chang password", {
          position: "bottom-right",
        });
      },
    })

    reset();
  };

  return renderForm(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <CardTitle>
                    Change Password
                  </CardTitle>

                  <CardDescription>
                    Update your account password to
                    keep your account secure.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Current Password */}
              <div className="space-y-2">
                <Label>Current Password</Label>

                <div className="relative">
                  <Input
                    type={
                      showCurrent
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter current password"
                    className="pr-10"
                    {...register(
                      "currentPassword"
                    )}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showCurrent ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.currentPassword && (
                  <p className="text-xs text-destructive">
                    {/* @ts-ignore */}
                    {
                      errors.currentPassword
                        .message
                    }
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label>New Password</Label>

                <div className="relative">
                  <Input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter new password"
                    className="pr-10"
                    {...register("newPassword")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="text-xs text-destructive">
                    {/* @ts-ignore */}
                    {
                      errors.newPassword
                        .message
                    }
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label>
                  Confirm Password
                </Label>

                <div className="relative">
                  <Input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    className="pr-10"
                    {...register(
                      "confirmPassword"
                    )}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {/* @ts-ignore */}
                    {
                      errors
                        .confirmPassword
                        .message
                    }
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  type="submit"
                  disabled={
                    !isDirty ||
                    !isValid ||
                    isSubmitting
                  }
                >
                  {isSubmitting && <Loader />}
                  {isSubmitting
                    ? "Updating..."
                    : "Update Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Password Guidelines
              </CardTitle>

              <CardDescription>
                We recommend using a strong and
                unique password.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ At least 8 characters</li>
                <li>
                  ✓ Include uppercase &
                  lowercase letters
                </li>
                <li>
                  ✓ Include at least one
                  number
                </li>
                <li>
                  ✓ Include a special
                  character
                </li>
                <li>
                  ✓ Don't reuse previous
                  passwords
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Security Tips
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                Never share your password with
                anyone.
              </p>

              <p>
                Always sign out from shared or
                public computers.
              </p>

              <p>
                Enable two-factor authentication
                when available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}