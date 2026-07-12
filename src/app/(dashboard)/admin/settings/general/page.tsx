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