import { Button } from "@/components/ui/button";
import { getPlaceDetails, getPexelsImages } from "@/service/globalAPi";
import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";

const Information = ({ trip }) => {
    const [imageUrl, setImageUrl] = useState("/placeholder.webp");

    const fetchPexelsImage = async () => {
        try {
            const location = trip?.userSelection?.location?.label;
            if (!location) return;

            const response = await getPexelsImages(location);
            const photos = response.data.photos;
            if (photos.length > 0) {
                setImageUrl(photos[0].src.large);
            }
        } catch (error) {
            console.error("Error fetching Pexels images:", error);
        }
    };

    useEffect(() => {
        fetchPexelsImage();
    }, [trip]);

    return (
        <div>
            <img
                src={imageUrl}
                alt={trip?.userSelection?.location?.label || "Location"}
                className="h-[340px] w-full border object-cover rounded-xl"
            />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold mt-4">
                        {trip?.userSelection?.location?.label}
                    </h1>
                    <div className="flex gap-5">
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            📅 {trip?.userSelection?.noOFDays} Day
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            💰 {trip?.userSelection?.budget} Budget
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 max-sm:text-xs">
                            🥂 No of Travelers: {trip?.userSelection?.traveler}
                        </p>
                    </div>
                </div>

                <Button>
                    <FaShareAlt />
                </Button>
            </div>
        </div>
    );
};

export default Information;
