'use client';


import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import { ReactNode } from 'react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    links: PaginationLink[];
};

function PaginationLink(props: { isActive: boolean; onClick: () => '' | null | void; children: ReactNode }) {
    return null;
}

export function PaginationControls({ links }: Props) {
    // Helpers to clean up label and detect special links
    const getLabel = (label: string) => {
        const html = label.replace(/&laquo;|&raquo;/g, '').trim();
        return html === '&hellip;' ? '...' : html;
    };

    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    const label = getLabel(link.label);

                    if (label === '...') {
                        return (
                            <PaginationItem key={i}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    if (i === 0) {
                        return (
                            <PaginationItem key="prev">
                                <PaginationPrevious
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        );
                    }

                    if (i === links.length - 1) {
                        return (
                            <PaginationItem key="next">
                                <PaginationNext
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={!link.url ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink isActive={link.active} onClick={() => link.url && router.visit(link.url)}>
                                {label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
