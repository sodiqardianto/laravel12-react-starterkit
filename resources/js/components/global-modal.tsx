import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/stores/modal-stores';

export function GlobalModal() {
    const { isOpen, title, description, content, footer, closeModal } = useModalStore();

    return (
        <Dialog open={isOpen} onOpenChange={(v) => !v && closeModal()}>
            <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-xl">
                <DialogHeader className="shrink-0">
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="grow overflow-y-auto py-2">{content}</div>

                {footer && <DialogFooter className="shrink-0">{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
