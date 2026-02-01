export default function ProductGallery({img1, img2, img3, img4}) {
    return (
        <div>
            {/* Main Image */}
            <div className="w-auto aspect-square overflow-hidden mb-4 mt-20 ml-10">
                <img
                    src= {img1}
                    alt="Hazelnut Latte"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4 ml-10 w-185">
                <div className="aspect-square overflow-hidden cursor-pointer">
                    <img
                        src={img2}
                        alt="thumbnail 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="aspect-square overflow-hidden cursor-pointer">
                    <img
                        src={img3}
                        alt="thumbnail 2"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="aspect-square overflow-hidden cursor-pointer">
                    <img
                        src={img4}
                        alt="thumbnail 3"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}