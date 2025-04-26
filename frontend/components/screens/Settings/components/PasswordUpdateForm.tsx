"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { passwordSchema } from "./validation/updatePassword.validation";
import CustomButton from "@/components/customs/CustomButton/CustomButton";
import settingServices from "@/services/settings.services";

type PasswordFormValues = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const PasswordSettingsForm = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<PasswordFormValues>({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (data: PasswordFormValues) => {
        try {
            setLoading(true);
            const response = await settingServices.updatePassword(data);
            toast.success(response?.message);

            form.reset();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-800 rounded-lg space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4">Reset Password</h2>

            <Form {...form}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Current Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter current password"
                                        type="password"
                                        className="bg-slate-700 text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter new password"
                                        type="password"
                                        className="bg-slate-700 text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Confirm new password"
                                        type="password"
                                        className="bg-slate-700 text-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <CustomButton
                    isLoading={loading}
                    text="Update Password"
                    className="mt-4"
                    onClick={form.handleSubmit(onSubmit)}
                />
            </Form>
        </div>
    );
};

export default PasswordSettingsForm;
