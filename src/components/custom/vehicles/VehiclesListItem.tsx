import type { VehicleResponse } from '@/api/schemas';
import { Badge } from '@/components/ui/badge';
import VehicleAvatarInstock from '@/assets/icons/vehicleAvatarInstock.svg?react';
import VehicleAvatarSold from '@/assets/icons/vehicleAvatarSold.svg?react';
import LikeIcon from '@/assets/icons/like.svg?react';
import UnLikeIcon from '@/assets/icons/unLike.svg?react';
import { cn } from '@/lib/utils';

type Props = {
    vehicle: VehicleResponse;
};

export default function VehiclesListItem({ vehicle }: Props) {
    return (
        <div
            key={vehicle.vin}
            className="w-full py-5 flex justify-between gap-2 border-b"
        >
            <div className="flex w-3/4">
                {vehicle.status === 'Sold' ? (
                    <VehicleAvatarSold />
                ) : (
                    <VehicleAvatarInstock />
                )}
                <div className="text-[14px] ml-3">
                    <p className="text-[#192252] font-bold">{vehicle.vin}</p>
                    <p className="text-[#636777]">
                        {' '}
                        {vehicle.model!.name} {vehicle?.model!.make.name}{' '}
                        {vehicle.year}
                    </p>
                    <p className="text-[#636777]">
                        Location:{' '}
                        <span className="text-[#192252] font-medium">
                            {vehicle.city}, {vehicle.street}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex items-start w-1/3  md:w-1/5 justify-between">
                <Badge
                    className={cn(
                        vehicle.status === 'Sold'
                            ? 'bg-[#23A1E9]'
                            : 'bg-[#0DCF89]'
                    )}
                >
                    {vehicle.status}
                </Badge>
                <div>
                    {vehicle.model_id % 2 ? (
                        <LikeIcon className="cursor-pointer" />
                    ) : (
                        <UnLikeIcon className="cursor-pointer" />
                    )}
                </div>
            </div>
        </div>
    );
}
