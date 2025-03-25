export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveles in exploration",
        icon: "✈️",
        people: "1 person",
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two traveles in tandem",
        icon: "🥂",
        people: "2 People",
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "🏡",
        people: "3 to 5 People",
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekes",
        icon: "⛵",
        people: "5 to 10 People",
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Dont worry about cost",
        icon: "💸",
    },
];

export const AI_PROMPT = "Generate travel plan for location: {location}, for {noOfDays} days for {traveler} with a {budget} budget. Give me hotel options list with hotel names, hotel address, price, hotel image url, geo coordinates, ratings, description and suggest itenerary with place name, place details, place image url, geo coordinates, ticket pricing, time to travel to each location for {noOfDays} days with each day plan with best time to visit in JSON format";