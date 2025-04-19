import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { type PropsWithChildren } from 'react';

const BusinessLayout = ({ children }: PropsWithChildren) =>{
    return (
        <>
            <div className="px-4 py-6">
                <Heading title="Business List" description="Manage your all and business accounts" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <Separator className="my-6 md:hidden" />
                    <div className="flex-1 w-full">
                        <section className="w-full space-y-12">{children}</section>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BusinessLayout;
