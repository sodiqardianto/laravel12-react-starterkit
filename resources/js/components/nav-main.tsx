import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { capitalizeWords, cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { DynamicIcon } from './dynamic-icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const normalizeHref = (href?: string) => `/${(href || '').replace(/^\/+/, '')}`;

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <SidebarMenu>
            {items.map((item) =>
                item.children && item.children.length > 0 ? (
                    isCollapsed ? (
                        <SidebarMenuItem className="flex items-center justify-center">
                            <DropdownMenu>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-muted">
                                                {typeof item.icon === 'string' && <DynamicIcon name={item.icon} />}
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{capitalizeWords(item.name)}</TooltipContent>
                                </Tooltip>

                                <DropdownMenuContent side="right" className="min-w-52 list-none rounded-md p-1">
                                    <ul className="m-0 flex list-none flex-col space-y-1 p-0">
                                        {item.children.map((child) => (
                                            <li key={child.href || child.name} className="list-none">
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={url.startsWith(normalizeHref(child.href))}
                                                    className="w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted/20"
                                                >
                                                    <Link href={normalizeHref(child.href)} prefetch className="flex items-center gap-2">
                                                        {typeof child.icon === 'string' && <DynamicIcon name={child.icon} />}
                                                        <span>{capitalizeWords(child.name)}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </li>
                                        ))}
                                    </ul>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ) : (
                        <Collapsible
                            key={item.href || item.name}
                            defaultOpen={
                                (item.href && url.startsWith(normalizeHref(item.href))) ||
                                item.children?.some((child) => url.startsWith(normalizeHref(child.href)))
                            }
                            className="group/collapsible"
                        >
                            <CollapsibleTrigger className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium transition hover:bg-muted/30">
                                {typeof item.icon === 'string' && <DynamicIcon name={item.icon} />}
                                <span className="flex-1 text-left">{capitalizeWords(item.name)}</span>
                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="mt-1 ml-6 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarMenuItem key={child.href || child.name}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={url.startsWith(normalizeHref(child.href))}
                                                className="rounded-md px-2 py-1 text-sm transition hover:bg-muted/20"
                                            >
                                                <Link href={normalizeHref(child.href)} prefetch>
                                                    {typeof child.icon === 'string' && <DynamicIcon name={child.icon} />}
                                                    <span>{capitalizeWords(child.name)}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )
                ) : (
                    <SidebarMenuItem key={item.href || item.name}>
                        <SidebarMenuButton
                            asChild
                            isActive={url.startsWith(normalizeHref(item.href))}
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-muted',
                                !isCollapsed && 'w-full justify-start px-4 text-sm font-medium',
                            )}
                        >
                            {isCollapsed ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href={normalizeHref(item.href)} prefetch className="flex h-full w-full items-center justify-center">
                                            {typeof item.icon === 'string' && <DynamicIcon name={item.icon} />}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{capitalizeWords(item.name)}</TooltipContent>
                                </Tooltip>
                            ) : (
                                <Link href={normalizeHref(item.href)} prefetch className="flex items-center gap-2">
                                    {typeof item.icon === 'string' && <DynamicIcon name={item.icon} />}
                                    <span>{capitalizeWords(item.name)}</span>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ),
            )}
        </SidebarMenu>
    );
}
