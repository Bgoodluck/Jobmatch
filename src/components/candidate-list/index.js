"use client";

import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { supabase } from "@/supabase";

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  function handlePreviewResume(){
     const {data} = supabase.storage
     .from('job-board-public')
     .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

     console.log(data, "resume");
     const a = document.createElement('a');
     a.href = data?.publicUrl;
     a.setAttribute('download', 'Resume.pdf');
     a.setAttribute('target', '_blank');
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a)
  }


  async function handleUpdateJobStatus(getCurrentStatus){
        let copyJobApplicants = [...jobApplications];
        const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(
            (item) => item.candidateUserID === currentCandidateDetails?.userId
        );
        const jobApplicantsToUpdate = {
            ...copyJobApplicants[indexOfCurrentJobApplicant],
            status : copyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        };
        await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs")
  }


  return (
    <>
      <div>
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div
                key={jobApplicantItem?.id || jobApplicantItem?.candidateUserID}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="flex dark:bg-green-400 h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent aria-describedby="candidate-details-description">
            <DialogTitle>Candidate Details</DialogTitle>
            <p id="candidate-details-description">
                Detailed information about the candidate.
            </p>
          <div>
            <h1 className="text-2xl font-semibold dark:text-white text-black">
              <span className="text-[#4169E1] font-bold mr-6">Name:</span>{" "}
              {currentCandidateDetails?.candidateInfo?.name}
              {","}
            </h1>
            <h4 className="text-xl font-bold text-blue-500">
              <span className="text-[#4169E1] font-bold mr-6">Email:</span>{" "}
              {currentCandidateDetails?.email}
            </h4>
            <p className="text-sm font-medium dark:text-white text-black">
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Current Location:
              </span>{" "}
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p className="text-normal font-medium dark:text-white text-black">
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Current Company:
              </span>
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-normal font-medium dark:text-white text-black">
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Notice Period:
              </span>
              {currentCandidateDetails?.candidateInfo?.noticePeriod}
            </p>
            <p>
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Years of Experience:
              </span>{" "}
              {currentCandidateDetails?.candidateInfo?.totalYearsOfExperience}
            </p>
            <p>
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Salary:
              </span>
              {currentCandidateDetails?.candidateInfo?.currentSalary}
            </p>
            <p>
              <span className="text-[#4169E1] text-sm font-bold mr-6">
                Linkedin:
              </span>{" "}
              {currentCandidateDetails?.candidateInfo?.linkedinProfile}
            </p>
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <h1 className="text-[#4169E1] text-sm font-bold">
                Previous Companies
              </h1>
              {currentCandidateDetails?.candidateInfo?.previousCompanyWorked
                .split(",")
                .map((skillItem, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 flex justify-center items-center dark:bg-white bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] font-medium dark:text-black text-white whitespace-nowrap">
                      {skillItem.trim()}
                    </h2>
                  </div>
                ))}
            </div>
            <div className="flex gap-4 mt-6 flex-wrap">
              {currentCandidateDetails?.candidateInfo?.areaOfExpertise
                .split(",")
                .map((skillItem, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 flex justify-center items-center dark:bg-white bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] font-medium dark:text-black text-white whitespace-nowrap">
                      Skills: {skillItem.trim()}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
             <div className="flex gap-3">
                <Button 
                    onClick={handlePreviewResume} 
                    className='flex h-11 items-center justify-center px-5'
                 >
                    Resume
                </Button>
                <Button 
                    onClick={()=> handleUpdateJobStatus('selected')} 
                    className='disabled:opacity-65 flex h-11 items-center justify-center px-5'
                    disabled={
                        jobApplications.find(
                            (item) => item.candidateUserID === currentCandidateDetails?.userId
                        )
                        ?.status.includes("selected") || jobApplications
                        .find(
                            (item)=> 
                                item.candidateUserID === currentCandidateDetails?.userId
                        ) 
                        ?.status.includes("rejected") 
                        ? true : false
                    }
                 >
                    {
                        jobApplications.find(
                            (item) => item.candidateUserID === currentCandidateDetails?.userId
                        )
                        ?.status.includes("selected") ? 'Selected' : 'Select'
                    }
                    
                </Button>
                <Button 
                    onClick={()=> handleUpdateJobStatus('rejected')} 
                    className='flex h-11 items-center justify-center px-5'
                    disabled={
                        jobApplications.find(
                            (item) => item.candidateUserID === currentCandidateDetails?.userId
                        )
                        ?.status.includes("selected") || jobApplications
                        .find(
                            (item)=> 
                                item.candidateUserID === currentCandidateDetails?.userId
                        ) 
                        ?.status.includes("rejected") 
                        ? true : false
                    }
                 >
                    {
                        jobApplications.find(
                            (item) => item.candidateUserID === currentCandidateDetails?.userId
                        )
                        ?.status.includes("rejected") ? 'Rejected' : 'Reject'
                    }
                    
                </Button>
             </div>
        </DialogFooter>
        </DialogContent>
        
      </Dialog>
    </>
  );
}

export default CandidateList;
