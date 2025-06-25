import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface ServerPaginationProps {
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search?: string;
        per_page?: string;
    };
}

export function ServerPagination({ pagination, filters }: ServerPaginationProps) {
    const { url } = usePage();
    const baseUrl = url.split('?')[0];
    const { current_page, last_page, per_page, total, from, to } = pagination;

    const changePage = (page: number) => {
        router.get(
            baseUrl,
            {
                ...filters,
                page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const changePerPage = (newPerPage: string) => {
        router.get(
            baseUrl,
            {
                ...filters,
                per_page: newPerPage,
                page: 1, // Reset ke halaman pertama
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 4;

        if (last_page <= maxVisiblePages) {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, current_page - 2);
            let endPage = Math.min(last_page, current_page + 2);

            if (current_page <= 3) {
                endPage = Math.min(last_page, 4);
            }
            if (current_page >= last_page - 2) {
                startPage = Math.max(1, last_page - 4);
            }

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('...');
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < last_page) {
                if (endPage < last_page - 1) {
                    pages.push('...');
                }
                pages.push(last_page);
            }
        }

        return pages;
    };

    const getMobilePageNumbers = () => {
        const pages = [];
        const maxMobilePages = 3;

        if (last_page <= maxMobilePages) {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, current_page - 1);
            let endPage = Math.min(last_page, current_page + 1);

            if (current_page === 1) {
                endPage = Math.min(last_page, 3);
            }
            if (current_page === last_page) {
                startPage = Math.max(1, last_page - 2);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="space-y-4 px-2 py-4">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
                {/* Results info */}
                <div className="mb-3 text-center text-sm text-muted-foreground">
                    Menampilkan {from} - {to} dari {total} hasil
                </div>

                {/* Page info and per page selector */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-medium">
                        Halaman {current_page} dari {last_page}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Baris</span>
                        <Select value={per_page.toString()} onValueChange={changePerPage}>
                            <SelectTrigger className="h-8 w-16">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-center space-x-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => changePage(1)} disabled={current_page === 1}>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => changePage(current_page - 1)}
                        disabled={current_page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Mobile page numbers (limited) */}
                    <div className="flex items-center space-x-1">
                        {getMobilePageNumbers().map((page, index) => (
                            <Button
                                key={index}
                                variant={current_page === page ? 'default' : 'outline'}
                                size="icon"
                                className="h-8 w-8 text-xs"
                                onClick={() => changePage(page as number)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => changePage(current_page + 1)}
                        disabled={current_page === last_page}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => changePage(last_page)}
                        disabled={current_page === last_page}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex sm:items-center sm:justify-between">
                <div className="flex-1 text-sm text-muted-foreground">
                    Menampilkan {from} - {to} dari {total} hasil
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Baris per halaman</p>
                        <Select value={per_page.toString()} onValueChange={changePerPage}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm font-medium">
                        Halaman {current_page} dari {last_page}
                    </div>

                    <div className="flex items-center space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => changePage(1)} disabled={current_page === 1}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => changePage(current_page - 1)}
                            disabled={current_page === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center space-x-1">
                            {getPageNumbers().map((page, index) => (
                                <div key={index}>
                                    {page === '...' ? (
                                        <span className="px-2 py-1 text-sm">...</span>
                                    ) : (
                                        <Button
                                            variant={current_page === page ? 'default' : 'outline'}
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => changePage(page as number)}
                                        >
                                            {page}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => changePage(current_page + 1)}
                            disabled={current_page === last_page}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => changePage(last_page)}
                            disabled={current_page === last_page}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
