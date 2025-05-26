import VehiclesListItem from './VehiclesListItem';
import type { VehicleResponse } from '@/api/schemas';
import { useVehiclesStore } from '@/store/useVehiclesStore';

function VehiclesList() {
    const vehicles = useVehiclesStore((s) => s.vehicles);
    
    return (
        <div className="gap-2 pl-3 pr-1.5 mt-6">
            {vehicles.map((vehicle: VehicleResponse) => {
                return <VehiclesListItem vehicle={vehicle} key={vehicle.id}/>;
            })}
        </div>
    );
}

export default VehiclesList;
