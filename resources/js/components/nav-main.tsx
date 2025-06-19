import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { capitalizeWords, cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { DynamicIcon } from './dynamic-icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const normalizeHref = (href?: string) => `/${(href || '').replace(/^\/+/, '')}`;

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();

    return (
        <SidebarMenu>
            {items.map((item) =>
                item.children && item.children.length > 0 ? (
                    <Collapsible
                        key={item.href || item.name}
                        defaultOpen={
                            (item.href && url.startsWith(normalizeHref(item.href))) ||
                            item.children?.some((child) => url.startsWith(normalizeHref(child.href)))
                        }
                        className="group/collapsible"
                    >
                        <CollapsibleTrigger
                            className={cn('flex w-full items-center rounded-md px-4 py-2 text-sm font-medium transition hover:bg-muted/30', 'group')}
                        >
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
                ) : (
                    <SidebarMenuItem key={item.href || item.name}>
                        <SidebarMenuButton
                            asChild
                            isActive={url.startsWith(normalizeHref(item.href))}
                            className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted/30"
                        >
                            <Link href={normalizeHref(item.href)} prefetch>
                                {typeof item.icon === 'string' && <DynamicIcon name={item.icon} />}
                                <span>{capitalizeWords(item.name)}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ),
            )}
        </SidebarMenu>
    );
}
