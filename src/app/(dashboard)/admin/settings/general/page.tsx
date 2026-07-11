"use client"

import { Search, Bell, Download, Trash, Upload, Copy, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAtom } from 'jotai'
import { authUserAtom } from '@/states/auth-user-state'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import CompanyUser from './_components/company-user'
import CompanyProfile from './_components/company-profile'

const General = () => {
  const [user] = useAtom(authUserAtom)

  // const {
  //   company,
  //   isLoading,
  // } = useGetCompany();

  // const {
  //   mutate: updateCompany,
  //   isPending,
  // } = useUpdateCompany(company?.id ?? "");

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: companySchema,
  //   defaultValues: {
  //     name: "",
  //     RCNumber: "",
  //     address: "",
  //     industry: "",
  //     logo: "",
  //   },
  // });

  //   const onSubmit: SubmitHandler<UpdateCompanyFormValues> = (
  //   values
  // ) => {
  //   updateCompany(values, {
  //     onSuccess() {
  //       toast.success("Company updated successfully");
  //     },

  //     onError(error: any) {
  //       toast.error(
  //         error?.response?.data?.message ??
  //           "Unable to update company"
  //       );
  //     },
  //   });
  // };

  // const fileInput = useRef<HTMLInputElement>(null);

  // const [logo, setLogo] = useState(company?.logo);

  // const {
  //   uploadCompanyLogo,
  //   isLoading: uploading,
  // } = useUploadCompanyLogo();

  // const handleLogoUpload = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   try {
  //     const url = await uploadCompanyLogo(file);

  //     updateCompany(
  //       {
  //         logo: url,
  //       },
  //       {
  //         onSuccess() {
  //           setLogo(url);

  //           toast.success("Logo updated");
  //         },
  //       }
  //     );
  //   } catch {
  //     toast.error("Unable to upload logo");
  //   }
  // };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Company Profile */}
      <div className="lg:col-span-2 space-y-6">
       <CompanyProfile />
      </div>

      {/* Sidebar */}
      <CompanyUser />
    </div>
  )
}

export default General