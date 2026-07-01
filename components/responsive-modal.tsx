import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog,
    DialogHeader, DialogDescription, 
    DialogTitle, DialogContent 
} from "./ui/dialog";
import { Drawer } from "./ui/drawer";

type ResponsiveModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function ResponsiveModal({
    open,
    onOpenChange,
    title,
    description,
    children
}: ResponsiveModalProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
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
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description && (
                    <DialogDescription>{description}</DialogDescription>
                )}
            </DialogHeader>
            <DialogContent>
                {children}
            </DialogContent>
        </Drawer>
    )
}