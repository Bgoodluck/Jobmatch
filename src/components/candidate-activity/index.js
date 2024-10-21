"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicants) => jobApplicants.status).flat(1)
    ),
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between dark:border-white border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusArray.map((status, index) => (
              <TabsTrigger key={index} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className=" container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {uniqueStatusArray.map((status, index) => (
                <TabsContent key={index} value={status}>
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (jobApplication) =>
                              jobApplication.status.indexOf(status) > -1
                          )
                          .findIndex(
                            (filteredItemByStatus) =>
                              jobItem._id === filteredItemByStatus.jobID
                          ) > -1
                    )
                    .map((finalFilteredItem, index) => {
                      // Find the corresponding job applicant to get the jobAppliedDate
                      const matchedJobApplicant = jobApplicants.find(
                        (jobApplicant) =>
                          jobApplicant.jobID === finalFilteredItem._id
                      );

                      return (
                        <CommonCard
                          key={index}
                          icon={<JobIcon />}
                          jobTitle={finalFilteredItem?.jobTitle}
                          description={finalFilteredItem?.companyName}
                          footerContent={matchedJobApplicant?.jobAppliedDate}
                        />
                      );
                    })}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
