import * as Inertia from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import _ from 'lodash';

const formSchema = z.object({
    email: z.string().email('The provided email is not a valid email address.'),
    password: z.string().min(8, {
        message: 'The provided password must be at least 8 characters.',
    }),
    remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const inertia = Inertia.useForm<LoginFormValues>();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: LoginFormValues) => {
        Inertia.router.post(route('login'), values);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john.doe@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="*******"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter your password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-row gap-2">
                                    <FormControl>
                                        <Checkbox
                                            className=""
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                return checked;
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        Remember Me
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {inertia.errors && (
                        <div>
                            {Object.values(inertia.errors).map((error) => (
                                <p className="text-[0.8rem] font-medium text-destructive">
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}

                    {canResetPassword && (
                        <div>
                            <a
                                href={route('password.request')}
                                className="text-sm leading-7 text-muted-foreground underline [&:not(:first-child)]:mt-0"
                            >
                                Forgot your password?
                            </a>
                            <br />
                        </div>
                    )}

                    <Button type="submit">Log in</Button>
                </form>
            </Form>
        </GuestLayout>
    );
}
