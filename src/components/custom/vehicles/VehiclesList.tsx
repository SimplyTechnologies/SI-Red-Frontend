import VehiclesListItem from './VehiclesListItem';
import type { Vehicle } from '@/types/vehicleType';

type Props = {
    vehicles: Vehicle[];
};

function VehiclesList({ vehicles }: Props) {
    return (
        <div className="gap-2 pl-3 pr-1.5 mt-6">
            {vehicles.map((vehicle: Vehicle) => {
                return <VehiclesListItem vehicle={vehicle}/>
            })}
        </div>
    );
}

export default VehiclesList;
