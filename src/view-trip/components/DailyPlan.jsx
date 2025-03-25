import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const DailyPlan = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary
  const itineraryArray = itinerary ? Object.values(itinerary) : []

  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div>
        {itineraryArray.map((day, index) => (
          <div key={index} className="my-3">
            <h2 className="font-medium text-lg mb-3">Day {index + 1}</h2>

            {/* 🚀 Directly map day.plan */}
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5'>
            {day?.plan?.map((place, placeIndex) => (
              <div key={placeIndex}>
                <h2 className='text-sm text-orange-600'>{place?.time}</h2>

                <PlaceCardItem place={place} />
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DailyPlan
