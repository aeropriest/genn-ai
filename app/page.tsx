"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import StepBar from '@/components/ui/stepbar'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { formSchema } from "./constants"
import { SendHorizontal } from 'lucide-react';
import { useWaitModal } from "@/hooks/use-wait-modal";
import GenerateSoundView from "./views/generate-sound";

import { cn } from "@/lib/utils";

export default function Home() {
  const waitModal = useWaitModal();

  const [busy, setBusy] = useState(false);
  const [errorText, setErrorText] = useState('');


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stepText: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <GenerateSoundView />)
}
