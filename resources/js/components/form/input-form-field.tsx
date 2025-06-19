import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormFieldProps } from '@/types/form.types';

export const InputFormField = ({ type, name, label, placeholder, required = false, value, setData, error }: FormFieldProps) => (
    <div>
        <Label htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input type={type} name={name} value={value} onChange={(e) => setData(name, e.target.value)} placeholder={placeholder} />
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);
