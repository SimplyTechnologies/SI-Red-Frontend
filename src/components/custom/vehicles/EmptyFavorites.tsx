import EmptyFavorite from '@/assets/icons/emptyFavorites.svg?react';

export default function EmptyFavorites() {
    return (
        <div className="h-full w-full flex space-y-2 flex-col justify-center items-center text-center px-10">
            <EmptyFavorite />
            <p className="text-[18px] text-heading">
                There are no favorite vehicles
            </p>
            <p className="text-[14px]">
                To quickly access more information about vehicles, consider
                adding them to your favorites.
            </p>
        </div>
    );
}
