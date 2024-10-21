"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { useState } from "react";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "@/hooks/use-toast"

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {

  
  const [showJobDetailsDrawer, setShowJobsDetailsDrawer] = useState(false);

  const { toast } = useToast();

  async function handleJobApply(){

    const jobLimits = {
      nonMember: 2,
      basic: 5,
      silver: 10,
      platinum: 15,
      gold: 20,
  };

  const membershipType = profileInfo?.memberShipType || "nonMember"; 

  const maxJobsAllowed = jobLimits[membershipType];

  if (!profileInfo?.isPremiumUser && jobApplications.length >= jobLimits.nonMember) {
    setShowJobsDetailsDrawer(false);
    toast({
        variant: "destructive",
        title: "You have already applied to 2 jobs",
        description: "Please upgrade to Premium to apply to more",
        // action: <Link href={'/membership'}>Choose a plan</Link>,
    });
    return;
}


if (profileInfo?.isPremiumUser && jobApplications.length >= maxJobsAllowed) {
  setShowJobsDetailsDrawer(false);
    toast({
        variant: "destructive",
        title: `You have reached your ${membershipType} plan limit`,
        description: `You can only post ${maxJobsAllowed} jobs as a ${membershipType} member.`,
        // action: <Link href={'/membership'}>Upgrade your plan</Link>,
    });
    return;
}

    // if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
    //   setShowJobsDetailsDrawer(false);
    //   toast({
    //     variant: "destructive",
    //     title: "You have already applied to 2 jobs",
    //     description: "Please upgrade to Premium to apply to more",
    //     // action: <Link href={'/membership'}>Choose a plan</Link>,
    //   })        
    //   return;      
    // }

    await createJobApplicationAction({
      recruiterUserID: jobItem?.recruiterId,
      name: profileInfo?.candidateInfo?.name,
      email: profileInfo?.email,
      candidateUserID: profileInfo?.userId,
      status: ['Applied'],
      jobID: jobItem?._id,
      jobAppliedDate: new Date().toLocaleDateString(),
    }, '/jobs');

    setShowJobsDetailsDrawer(false);
  }


  return (
    <>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobsDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          jobTitle={jobItem?.jobTitle}
          description={jobItem?.companyName}
          footerContent={
            // <DrawerTrigger>
            <Button
              onClick={() => setShowJobsDetailsDrawer(true)}
              className="flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
            // </DrawerTrigger>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold dark:text-white text-gray-800">
                {jobItem?.jobTitle}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button 
                   onClick={handleJobApply}
                   disabled={
                    jobApplications.findIndex(
                      (item)=> item.jobID === jobItem?._id 
                    ) > -1 
                      ? true 
                      : false
                   } 
                   className="disabled:opacity-65 disabled:bg-blue-300 disabled:text-gray-950 flex h-11 items-center justify-center px-5"
                >
                  {
                    jobApplications.findIndex(
                      (item)=> item.jobID === jobItem?._id 
                    ) > -1 
                      ? "Applied" 
                      : "Apply"
                  }
                </Button>
                <Button
                  className="flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobsDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium dark:text-white text-gray-600">
            {jobItem?.jobDescription}
            <span className="text-xl font-normal dark:text-white text-gray-500 ml-6">
              {jobItem?.jobLocation}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] dark:bg-white bg-black rounded-[4px]">
            <h2 className="text-xl font-bold dark:text-black text-white">{jobItem?.jobType}</h2>
          </div>
          <h3 className="text-2xl font-medium dark:text-white text-black mt-3">
            {jobItem?.jobExperience} :Experience Needed
          </h3>
          <div className="flex gap-4 mt-6 flex-wrap">
            {jobItem?.jobSkills.split(",").map((skillItem, index) => (
              <div
                key={index}
                className="px-4 py-2 flex justify-center items-center dark:bg-white bg-black rounded-[4px]"
              >
                <h2 className="text-[13px] font-medium dark:text-black text-white whitespace-nowrap">
                  {skillItem.trim()} :Skills Needed
                </h2>
              </div>
            ))}
          </div>
          <DrawerFooter className="text-sm font-medium dark:text-white text-gray-600 mt-6">
            <h4 className="text-sm font-bold dark:text-white text-gray-800">
              <span className="text-red-950 dark:text-green-500">
                Salary Scale:
              </span> 
              {jobItem?.jobSalary}
            </h4>
        </DrawerFooter>
        </DrawerContent>
        
      </Drawer>
    </>
  );
}

export default CandidateJobCard;
