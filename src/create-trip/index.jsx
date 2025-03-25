import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/contants/options";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";

const CreateTrip = () => {
    const [place, setPlace] = useState(null);

    const [formData, setFormData] = useState([]);

    const handleIputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

	const onGenrateTrip = () => {
		if (formData?.noOFDays > 0 && !formData.location || !formData.noOFDays || !formData.budget || !formData.traveler) {
			toast("Please fill all the details");
			return;
		}
		
		const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location.label)
			.replace("{noOfDays}", formData?.noOFDays)
			.replace("{traveler}", formData?.traveler)
			.replace("{budget}", formData?.budget)
			.replace("{noOfDays}", formData?.noOFDays);

		console.log(FINAL_PROMPT);
	}

    return (
        <div className="flex items-center justify-center mb-10">
            <div className="sm:px-10 md:px-32 lg:px-54 xl:px-10 px-5 mt-10">
                <h2 className="font-bold text-3xl">
                    Tell us your travel preferences 🏕️🌴
                </h2>
                <p className="mt-3 text-gray-500 text-xl">
                    Just provide some basic information and our trip planner
                    will generate a customized itenary based on your
                    preferences.
                </p>

                <div className="mt-20 flex flex-col gap-10">
                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            What is your destination of choice?
                        </h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                placeholder: "Search for a destination...",
                                value: place,
                                onChange: (place) => {
                                    setPlace(place);
                                    handleIputChange("location", place);
                                },
                            }}
							loaderOptions={{
								async: true,
								defer: true,
							}}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            How many days are you planning your trip?
                        </h2>

                        <Input placeholder="Ex. 3" type="number" onChange={(e) => handleIputChange('noOFDays', e.target.value)} />
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            Whats's your budget?
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                            {SelectBudgetOptions.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title && "shadow-lg border-2 border-black"}`}
									onClick={() => handleIputChange('budget', item.title)}
                                >
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">
                            Who do you plan on travelling with on your next
                            adventure?
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                            {SelectTravelList.map((item, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler === item.people && "shadow-lg border-2 border-black"}`}
									onClick={() => handleIputChange('traveler', item.people)}
                                >
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button className="text-xl p-5" onClick={onGenrateTrip}>Generate Trip</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateTrip;
