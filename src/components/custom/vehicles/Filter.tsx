import { Input } from '@/components/ui/input';
import SearchIcon from '@/assets/icons/search.svg?react';
import FilterIcon from '@/assets/icons/filter.svg?react';
import { useEffect, useState } from 'react';
import { useVehiclesStore } from '@/store/useVehiclesStore';
import { useDebounce } from 'use-debounce';
import { VEHICLES_TABS } from '@/constants/constants';


export default function Filter() {
    const setSearch = useVehiclesStore((s) => s.setSearch);
    const setActiveTab = useVehiclesStore((s) => s.setActiveTab);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    useEffect(() => {
        setSearch(debouncedSearch);
        if (debouncedSearch.trim() !== '') {
            setActiveTab(VEHICLES_TABS.VEHICLES);
        }
    }, [debouncedSearch, setSearch, setActiveTab]);
    return (
        <div className="flex w-full items-center gap-3">
            <div className="flex items-center h-[42px] w-full border border-gray-300 rounded-[8px] px-2.5 pl-6">
                <SearchIcon className="mr-2 min-w-[16px]" />
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border-0 p-0 text-sm focus-visible:ring-0"
                />
            </div>
            <FilterIcon className="w-5 h-5 cursor-pointer" />
        </div>
    );
}
