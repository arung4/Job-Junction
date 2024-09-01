import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    console.log("Searched Query: ", searchedQuery); // Debug log
    console.log("All Jobs: ", allJobs); // Debug log

    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
       // Filter by Location
       const isLocationMatch = searchedQuery.Location
       ? job.location.toLowerCase().includes(searchedQuery.Location.toLowerCase())
       : true;

        // Filter by Industry
        const isIndustryMatch = searchedQuery.Industry
          ? job.title.toLowerCase().includes(searchedQuery.Industry.toLowerCase())
          : true;

        // Filter by Salary
        const isSalaryMatch = searchedQuery.Salary
          ? (() => {
              const [minSalary, maxSalary] = searchedQuery.Salary.split('-').map(Number);
              return job.salary >= minSalary && job.salary <= maxSalary;
            })()
          : true;

        // Debugging each filter result
        console.log("Job Title: ", job.title);
        console.log("Location Match: ", isLocationMatch);
        console.log("Industry Match: ", isIndustryMatch);
        console.log("Salary Match: ", isSalaryMatch);

        // Job is included if all filters match
        return isIndustryMatch && isSalaryMatch && isLocationMatch;
      });

      console.log("Filtered Jobs: ", filteredJobs); // Debug log
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-28 mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

