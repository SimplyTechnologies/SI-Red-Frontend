import { Button } from '@/components/ui/button';

export function AddNewVehicleButton() {
    return (
        <Button className="px-6 sm:px-8 md:px-[32px] h-12 md:h-[56px] w-full sm:w-[120px] md:w-[132px] ">
            <span className="text-lg sm:text-[17px] md:text-[18px] font-semibold">
                + Add
            </span>
        </Button>
    );
}