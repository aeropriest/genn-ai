"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { MoonLoader, BounceLoader } from 'react-spinners';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWaitModal } from "@/hooks/use-wait-modal";
// import { tools } from "@/constants";
// import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const WaitModal = () => {
    const waitModal = useWaitModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            // const response = await axios.get("/api/stripe");
            // window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={waitModal.isOpen} onOpenChange={waitModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold text-xl">
                            {waitModal.title}
                            {/* <Badge variant="premium" className="uppercase text-sm py-1">
                                pro
                            </Badge> */}
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        <div className="flex justify-center items-center flex-col gap-y-12 p-12">
                            <BounceLoader />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="bg-red-00 w-full  justify-center items-center pb-4">
                        <p className="text-center">It may take upto 10 seconds</p>
                    </div>
                    {/* <Button disabled={loading} onClick={onSubscribe} size="lg" className="w-full">
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
