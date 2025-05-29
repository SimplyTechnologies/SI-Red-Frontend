import VehiclesListItem from './VehiclesListItem';
import type { VehicleResponse } from '@/api/schemas';
import { useVehiclesStore } from '@/store/useVehiclesStore';

function FavoritesList() {
    const favorites = useVehiclesStore((s) => s.favorites);
    
    return (
        <div className="gap-2 pl-3 pr-1.5 mt-6">
            {favorites.map((vehicle: VehicleResponse) => {
                return <VehiclesListItem vehicle={vehicle} key={vehicle.id}/>;
            })}
        </div>
    );
}

export default FavoritesList;
