import { Button } from '@/components/ui/button';
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
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Inertia from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import z from 'zod';

// Discriminated unions are yucky.

type UserFormProps = { type: 'create' } | { type: 'edit'; data: User };

const createFormSchema = z
    .object({
        name: z.string().min(8),
        email: z
            .string()
            .email('The provided email is not a valid email address.'),
        password: z.string().min(8, {
            message: 'The provided password must be at least 8 characters.',
        }),
        password_confirmation: z.string().min(8, {
            message: 'The provided password must be at least 8 characters.',
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

const editFormSchema = z
    .object({
        name: z.string().min(8).optional(),
        email: z
            .string()
            .email('The provided email is not a valid email address.')
            .optional(),
        password: z
            .string()
            .min(8, {
                message: 'The provided password must be at least 8 characters.',
            })
            .optional(),
        password_confirmation: z
            .string()
            .min(8, {
                message: 'The provided password must be at least 8 characters.',
            })
            .optional(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type CreateUserFormValues = z.infer<typeof createFormSchema>;
type EditUserFormValues = z.infer<typeof editFormSchema>;

type UserFormValues = CreateUserFormValues | EditUserFormValues;

//@ts-ignore
export default function UserForm({ type, data }: UserFormProps) {
    const form = (() => {
        switch (type) {
            case 'create':
                return useForm<CreateUserFormValues>({
                    resolver: zodResolver(createFormSchema),
                });
            case 'edit':
                return useForm<EditUserFormValues>({
                    resolver: zodResolver(editFormSchema),
                });
        }
    })();

    const onSubmit = (values: UserFormValues) => {
        switch (type) {
            case 'create':
                Inertia.router.post(route('dashboard.users.store'), values, {
                    onFinish: () => form.reset(),
                });
            case 'edit':
                Inertia.router.patch(
                    route('dashboard.users.update', data.data.id),
                    values,
                    {
                        onFinish: () => form.reset(),
                    },
                );
        }
    };

    return (
        //@ts-ignore
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    //@ts-ignore
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    {...field}
                                    defaultValue={data?.data.name ?? ''}
                                />
                            </FormControl>
                            <FormDescription>The user's name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    //@ts-ignore
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="john.doe@example.com"
                                    {...field}
                                    defaultValue={data?.data.email ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                The user's email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    //@ts-ignore
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The user's password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    //@ts-ignore
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Confirm the user's password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogClose asChild>
                    <Button type="submit">Save</Button>
                </DialogClose>
            </form>
        </Form>
    );
}
