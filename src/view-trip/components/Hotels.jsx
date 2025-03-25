import React from 'react'
import { Link } from 'react-router'

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel?.hotelName}, ${hotel?.hotelAddress}`)}`}
            target="_blank"
            key={index}
            className="hover:scale-105 translate-all cursor-pointer"
          >
            <div>
              <img src="/placeholder.webp" className="rounded-xl border" />
              <div className="flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💰 {hotel?.price} {trip?.tripData?.currency} per Night</h2>
                <h2 className="text-sm">⭐ {hotel?.ratings}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
