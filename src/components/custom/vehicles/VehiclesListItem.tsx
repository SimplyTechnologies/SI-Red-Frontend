import type { VehicleResponse } from '@/api/schemas';
import { getVehicleStatusIcon, getLikeIcon } from '@/utils/vehicleHelpers';
import { getVehicleStatusBadge } from '@/helpers/getVehicleStatusBadge';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
    vehicle: VehicleResponse;
};

export default function VehiclesListItem({ vehicle }: Props) {
    const VehicleStatusIcon = getVehicleStatusIcon(vehicle.status);
    const { favorites, toggleFavorite, setSelectedVehicle } = useVehiclesStore((s) => ({
        favorites: s.favorites,
        toggleFavorite: s.toggleFavorite,
        setSelectedVehicle: s.setSelectedVehicle,
    }));
    const isFavorite = favorites.some((v) => v.id === vehicle.id);
    const LikeButtonIcon = getLikeIcon(isFavorite ?? false);
    const navigate = useNavigate();

    const showVehicleDetails = () => {
        setSelectedVehicle(vehicle)
        navigate(`/vehicles/${vehicle.id}`)
    }

    return (
        <div
            key={vehicle.vin}
            className="w-full py-5 flex justify-between gap-2 border-b"
        >
            <div 
                className="flex w-3/4 cursor-pointer" 
                onClick={showVehicleDetails}
            >
                <VehicleStatusIcon />
                <div className="text-[14px] ml-3">
                    <p className="text-[#192252] font-bold">{vehicle.vin}</p>
                    <p className="text-[#636777]">
                        {' '}
                        {vehicle?.model?.name} {vehicle?.model?.make?.name}{' '}
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
                {getVehicleStatusBadge(vehicle.status)}
                <div>
                    <LikeButtonIcon className='cursor-pointer' 
                        onClick={() => toggleFavorite(vehicle)}
                    />
                </div>
            </div>
        </div>
    );
}
