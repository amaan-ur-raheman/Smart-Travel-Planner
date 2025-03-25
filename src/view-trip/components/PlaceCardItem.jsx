import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const PlaceCardItem = ({ place }) => {
    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place?.placeName}`)}`} target="_blank">
            <div className="shadow-md border p-3 rounded-xl mt-2 flex gap-5 items-center hover:scale-105 transition-all cursor-pointer">
                <img
                    src="/placeholder.webp"
                    className="w-[130px] h-[130px] border rounded-xl"
                />
                <div>
                    <h2 className="font-bold text-lg">{place?.placeName}</h2>
                    <p className="text-sm text-gray-500">
                        {place?.placeDetails}
                    </p>
                    <h2 className="mt-1 text-xs">🕕 {place?.timeToTravel}</h2>
                    <p className="text-xs text-gray-500">Best Time to Visit: {place?.bestTimeToVisit}</p>
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItem;
