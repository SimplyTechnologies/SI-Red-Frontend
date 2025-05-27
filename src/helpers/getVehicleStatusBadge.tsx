import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; 

export function getVehicleStatusBadge(status: string) {
  const badgeClass = cn(
    status === 'Sold' ? 'bg-[#23A1E9]' : 'bg-[#0DCF89]'
  );

  return <Badge className={badgeClass}>{status}</Badge>;
}
