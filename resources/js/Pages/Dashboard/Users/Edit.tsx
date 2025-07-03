import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PenIcon } from 'lucide-react';
import UserForm from './Partials/UserForm';

export function EditUser(data: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">
                    <PenIcon />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Edit an existing user.
                    </DialogDescription>
                </DialogHeader>
                <UserForm type="edit" data={data} />
            </DialogContent>
        </Dialog>
    );
}
