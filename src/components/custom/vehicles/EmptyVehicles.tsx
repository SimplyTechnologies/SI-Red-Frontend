import EmptyVehicle from '@/assets/icons/emptyVehicles.svg?react';

export default function EmptyVehicles() {
    return (
        <div className="h-full w-full flex space-y-2 flex-col justify-center items-center text-center px-10 ">
                <EmptyVehicle />
                <p className="text-[18px] text-[#192252]">
                    There are no vehicles to display
                </p>
                <p className="text-[14px]">
                    You can add vehicles and set up specific zones to track
                    their locations and statuses.
                </p>
        </div>
    );
}
