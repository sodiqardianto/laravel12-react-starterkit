import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modal-stores';

export function GlobalModal() {
    const { isOpen, title, description, content, footer, closeModal } = useModalStore();

    return (
        <Dialog open={isOpen} onOpenChange={(v) => !v && closeModal()}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="py-2">{content}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
