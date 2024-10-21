'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast"
// import Link from "next/link";





function PostNewJob({profileInfo, user, jobList}) {

   
    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName : profileInfo?.recruiterInfo?.companyName
    })


    const { toast } = useToast();


    function handlePostNewBtnValid(){
        return Object.keys(jobFormData).every((control) => jobFormData[control].trim() !== '')
    }


    function handleAddNewJob() {
        // i had to define the job limits based on membership type
        const jobLimits = {
            nonMember: 2,
            basic: 5,
            silver: 10,
            platinum: 15,
            gold: 20,
        };
    
        // Check membership type from profileInfo
        const membershipType = profileInfo?.memberShipType || "nonMember"; 
    
        // Get the corresponding job limit
        const maxJobsAllowed = jobLimits[membershipType];
    
        // Check if the user has reached their job posting limit
        if (!profileInfo?.isPremiumUser && jobList.length >= jobLimits.nonMember) {
            toast({
                variant: "destructive",
                title: "You can only post 2 jobs",
                description: "Please opt for membership to post more jobs",
                // action: <Link href={'/membership'}>Choose a plan</Link>,
            });
            return;
        }
    
        // Apply the limit based on the user's membership plan
        if (profileInfo?.isPremiumUser && jobList.length >= maxJobsAllowed) {
            toast({
                variant: "destructive",
                title: `You have reached your ${membershipType} plan limit`,
                description: `You can only post ${maxJobsAllowed} jobs as a ${membershipType} member.`,
                // action: <Link href={'/membership'}>Upgrade your plan</Link>,
            });
            return;
        }
    
        
        setShowJobDialog(true);
    }
    


    async function createNewJob(){
        await postNewJobAction({
            ...jobFormData,
            recruiterId : user?.id,
            applicants: []
        }, '/jobs')

       
        setJobFormData({...initialPostNewJobFormData, companyName : profileInfo?.recruiterInfo?.companyName});
        setShowJobDialog(false);
        toast({
            title: "Job Posted",
            description: "Successfully",
          });
    }


    return(
        <div>
            <Button onClick={handleAddNewJob} className=' disabled:opacity-60 flex h-11 items-center justify-center px-5'>
                Post A Job
            </Button>
            <Dialog open={showJobDialog} onOpenChange={()=> {
                setShowJobDialog(false);
                setJobFormData({...initialPostNewJobFormData, companyName : profileInfo?.recruiterInfo?.companyName});
            }}>
                 <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle> Post New Job</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to post a new job. All fields are required.
                            </DialogDescription>

                        <div className=" grid gap-4 py-4">
                            <CommonForm 
                                  buttonText={'Add'}
                                  formData={jobFormData}
                                  setFormData={setJobFormData}
                                  formControls={postNewJobFormControls}
                                  isBtnDisabled={!handlePostNewBtnValid()}
                                  action={createNewJob}
                            /> 
                        </div>
                    </DialogHeader>
                 </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob;