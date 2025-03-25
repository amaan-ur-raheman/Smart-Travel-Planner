import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPexelsImages } from "@/service/globalAPi";

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({}); // Store images for each hotel

  const fetchHotelImages = async () => {
    if (!trip?.tripData?.hotelOptions) return;

    const images = {};
    for (const hotel of trip.tripData.hotelOptions) {
      try {
        const response = await getPexelsImages(hotel?.hotelName || "hotel");
        const photos = response.data.photos;
        if (photos.length > 0) {
          images[hotel.hotelName] = photos[0].src.large; // Use the first image
        } else {
          images[hotel.hotelName] = "/placeholder.webp"; // Fallback image
        }
      } catch (error) {
        console.error(`Error fetching image for ${hotel?.hotelName}:`, error);
        images[hotel.hotelName] = "/placeholder.webp"; // Fallback image
      }
    }
    setHotelImages(images);
  };

  useEffect(() => {
    fetchHotelImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${hotel?.hotelName}, ${hotel?.hotelAddress}`
            )}`}
            target="_blank"
            key={index}
            className="hover:scale-105 translate-all cursor-pointer"
          >
            <div>
              <img
                src={hotelImages[hotel.hotelName] || "/placeholder.webp"}
                alt={hotel?.hotelName}
                className="rounded-xl border object-cover h-40 w-full"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">
                  💰 {hotel?.price} {trip?.tripData?.currency} per Night
                </h2>
                <h2 className="text-sm">⭐ {hotel?.ratings}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
