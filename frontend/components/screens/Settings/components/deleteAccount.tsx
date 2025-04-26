"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import settingServices from "@/services/settings.services"
import { deleteAccountSchema } from "./validation/deleteAccountValidation"

type DeleteAccountFormData = {
    confirm: string
}

const DeleteAccount = () => {
    const router = useRouter();

    const form = useForm<DeleteAccountFormData>({
        resolver: yupResolver(deleteAccountSchema),
        defaultValues: {
            confirm: "",
        },
    })

    const handleDeleteAccount = async () => {
        try {
            const response = await settingServices.deleteAccount();
            toast.success(response?.message)
            form.reset();
            router.push("/login");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="bg-slate-800 border border-red-300 p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
            <p className="text-red-600">
                Deleting your account is permanent and cannot be undone.
            </p>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete My Account</Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-slate-900 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please type{" "}
                            <span className="font-medium text-red-500">delete my account</span> to confirm.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                        <div className="space-y-4 mt-4">
                            <FormField
                                control={form.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmation</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Type 'delete my account'"
                                                {...field}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AlertDialogFooter>
                                <AlertDialogCancel type="button" className="text-black" onClick={() => form.reset()}>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={form.handleSubmit(handleDeleteAccount)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </div>
                    </Form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DeleteAccount
