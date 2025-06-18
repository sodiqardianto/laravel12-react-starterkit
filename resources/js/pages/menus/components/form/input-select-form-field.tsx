import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { capitalizeWords } from '@/lib/utils';

interface SelectItemType {
    id: number | string;
    name: string;
}

interface InputSelectFormProps<T extends SelectItemType> {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    value: string | null;
    onChange: (value: string | null) => void;
    listOfValues: T[];
}

export const InputSelectFormField = <T extends SelectItemType>({
    name,
    label,
    placeholder,
    required = false,
    value,
    onChange,
    listOfValues,
    error,
}: InputSelectFormProps<T>) => (
    <div>
        <Label htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value ?? 'null'} onValueChange={(val) => onChange(val === 'null' ? null : val)}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="null">{placeholder ?? 'Silahkan Pilih'}</SelectItem>
                {listOfValues.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                        {capitalizeWords(item.name)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);
