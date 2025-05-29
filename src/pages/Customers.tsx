import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "@/components/custom/customers/EmptyState";
import Header from "@/components/custom/customers/Header";

export default function Customers() {
  const customers: any[] = [];

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 overflow-hidden bg-white shadow rounded-[16px] flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <Header />
            <TableBody>
              {customers.length === 0 ? <EmptyState /> : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
