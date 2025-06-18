export const FORM_FIELDS = {
    NAME: { label: 'Nama Menu', placeholder: 'Masukan Nama Menu', required: true },
    HREF: { label: 'URL', placeholder: 'Masukan URL Route', required: true },
    ICON: { label: 'Ikon (Optional)', placeholder: 'Masukan Ikon dari Lucide Ikon', required: false },
    PARENT_ID: { label: 'Parent Menu', placeholder: 'Pilih parent menu (boleh dikosongkan)', required: false },
} as const;
