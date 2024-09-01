import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";



const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "Full Stack Developer", "Data Scientist"],
  },
  {
    filterType: "Salary",
    array: ["10-20", "20-30", "30-40"
    ],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Industry: "",
    Salary: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    console.log("Selected Filters: ", selectedFilters)
    dispatch(setSearchedQuery(selectedFilters)); // Dispatch the entire filter object
  }, [selectedFilters]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
     
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            <RadioGroup value={selectedFilters[data.filterType]} onValueChange={(value)=>changeHandler(data.filterType,value)}>

            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
            </RadioGroup>
          </div>
        ))}
    </div>
  );
};

export default FilterCard;




















