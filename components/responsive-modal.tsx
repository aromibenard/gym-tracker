import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog,
    DialogHeader, DialogDescription, 
    DialogTitle, DialogContent, 
    DialogTrigger
} from "./ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

type ResponsiveModalProps = {
    title?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    description?: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
}

export function ResponsiveModal({
    title,
    description,
    children,
    trigger,
    open,
    onOpenChange
}: ResponsiveModalProps) {

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>

                    {children}
                </DialogContent>
            </Dialog>
        );
    }



    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                {description && (
                    <DrawerDescription>{description}</DrawerDescription>
                )}
            </DrawerHeader>
            <DrawerContent>
                {children}
            </DrawerContent>
        </Drawer>
    )
}