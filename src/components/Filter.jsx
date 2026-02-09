export default function Filter({searchValue, onSearchChange, onSearch, selectedCats, onCatChange, selectedPromo, onPromoChange, priceRange, onPriceChange, onReset}) {
    return (
        <aside className="bg-black text-white rounded-xl p-6 w-full lg:w-65 h-fit">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filter</h3>
                <button onClick={onReset} className="text-sm text-gray-400 hover:text-white">
                    Reset Filter
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <label className="text-sm block mb-2">Search</label>
                <div className="flex items-center bg-white rounded-lg overflow-hidden">
                    <input
                        type="text"
                        value={searchValue}
                        placeholder="Search Your Product"
                        onChange={(e) => onSearchChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSearch()}
                        className="flex-1 px-3 py-2 text-sm text-black outline-none"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="mb-6 accent-[#FF8906]">
                <p className="font-semibold text-base mb-2">Category</p>
                <div className="space-y-2 text-sm">
                    {["Coffee", "Non Coffee", "Food", "Add-On"].map((cat) => (
                        <label key={cat} className="flex gap-2 items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCats.includes(cat)}
                                onChange={() => onCatChange(cat)}
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Sort By */}
            <div className="mb-6 accent-[#FF8906]">
                <p className="font-semibold text-base mb-2">Sort By</p>
                <div className="space-y-2 text-sm">
                    {["Buy 1 get 1", "Flash Sale", "Birthday Package", "Cheap"].map((promo) => (
                        <label key={promo} className="flex gap-2 items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedPromo.includes(promo)}
                                onChange={() => onPromoChange(promo)}
                            />
                            {promo}
                        </label>
                    ))}
                </div>
            </div>

            {/* Range Price */}
            <div className="mb-8">
                <p className="font-semibold mb-3">Range Price (IDR {priceRange.toLocaleString()})</p>
                <div className="relative mb-4">
                    <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange}
                        onChange={(e) => onPriceChange(parseInt(e.target.value))}
                        className="w-full accent-[#FF8906]"
                    />
                </div>

                <div className="flex justify-between text-xs text-gray-300">
                    <span>IDR 0</span>
                    <span>IDR 50.000</span>
                </div>
            </div>

            <button onClick={onSearch} className="w-full bg-orange-500 hover:bg-orange-600 transition py-2 rounded font-bold">
                Apply Filter
            </button>
        </aside>
    )
}