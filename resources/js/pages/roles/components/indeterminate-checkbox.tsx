import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import * as React from 'react';

export interface IndeterminateCheckboxProps extends CheckboxProps {
    indeterminate?: boolean;
}

const IndeterminateCheckbox = React.forwardRef<React.ElementRef<typeof Checkbox>, IndeterminateCheckboxProps>(
    ({ indeterminate = false, ...props }, ref) => {
        const internalRef = React.useRef<HTMLButtonElement>(null);

        React.useEffect(() => {
            if (internalRef.current) {
                const input = internalRef.current.querySelector('input');
                if (input) {
                    input.indeterminate = indeterminate;
                }
            }
        }, [indeterminate]);

        return (
            <Checkbox
                {...props}
                ref={(node) => {
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (ref as React.MutableRefObject<any>).current = node;
                    }
                    internalRef.current = node;
                }}
            />
        );
    },
);

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default IndeterminateCheckbox;
