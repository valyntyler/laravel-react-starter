import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import UserForm from './Partials/UserForm';

export function CreateUser() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mb-4">
                    <PlusIcon />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>Add a new user.</DialogDescription>
                </DialogHeader>
                <UserForm type="create" />
            </DialogContent>
        </Dialog>
    );
}
