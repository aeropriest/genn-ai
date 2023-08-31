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

import { cn } from "@/lib/utils";

export default function Home() {
  const waitModal = useWaitModal();
  const initialSteps = [
    {
      title: "Your Experience",
      description: "Copy and paste link of your online experience profile",
      value: ""
    },
    {
      title: "Keywords",
      description: "Enter keywords that describe your profile",
      value: ""
    },
    {
      title: "Competitor Profile",
      description: "Copy and paste link of your competitor's profile",
      value: ""
    },
    {
      title: "Generating Profile",
      description: "Your profile is being generated...",
      value: ""
    },
  ];

  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(0)
  const [busy, setBusy] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [errorText, setErrorText] = useState('');


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stepText: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {


    console.log("In values", values.stepText, values.stepText.length)
    if (values.stepText.length <= 0) {
      setErrorText('Please add ' + steps[currentStep].title)
      return;
    }
    waitModal.onOpen('Please wait, loading ' + steps[currentStep].title);

    setErrorText('');
    const updatedSteps = [...steps];
    updatedSteps[currentStep].value = values.stepText;
    setSteps(updatedSteps);
    handleNext();
    console.log(steps);
    form.reset();
    setTimeout(() => {
      waitModal.onClose();
    }, 2000);

  }

  function handleNext() {
    if (currentStep < steps.length - 1)
      setCurrentStep((prev) => prev + 1)
  }
  async function handleBack() {
    if (currentStep > 0)
      setCurrentStep((prev) => prev - 1)
  }
  return (<div className="w-1/2 h-4/5 border border-gray-200 bg-gray-50 mx-auto flex flex-col mt-16">
    <div className="bg-blue-00 h-auto p-4 flex justify-center items-center w-full">
      <p className="text-gray-600 text-center w-full text-4xl mt-8 font-medium">Profile Pitch Pro</p>
    </div>
    <div className="bg-green-00 h-full p-4 flex flex-col justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full md:px-6  grid grid-cols-12 gap-2 my-2">
          <FormField
            control={form.control}
            name="stepText"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-11 flex justify-center items-center w-full">
                <FormControl>
                  <Input placeholder={steps[currentStep].description} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={busy} size="icon">
            <SendHorizontal color="white" size={16} />
          </Button>

        </form>
      </Form>
      {errorText && (
        <p className="py-2 text-red-500 text-center w-full text-xs font-light">
          {errorText}
        </p>
      )}
    </div>
    <div className="bg-pink-00 my-4 p-8 justify-center items-center w-full">
      <StepBar current={currentStep} labels={steps.map(step => step.title)} />
    </div>
    {/* <div className="bg-yellow-00 h-auto pb-2 flex justify-center items-center">
      <Button variant="link" onClick={handleBack}><p className="text-center w-full text-xs font-light">Back</p></Button>
    </div> */}
  </div>)
}
