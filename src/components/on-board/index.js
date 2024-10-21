'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react"
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { supabase } from "@/supabase";



function OnBoard (){

    const [currentTab, setCurrentTab] = useState('candidate');

    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const [file, setFile] = useState(null)


    const currentAuthUser = useUser();
    const { user } = currentAuthUser;
    console.log(currentAuthUser)


    function handleFileChange(event){
        event.preventDefault();
        setFile(event.target.files[0])
    }


    async function handleUploadPdfToSupabase() {
        if (!file) {
          console.log("No file selected");
          return;
        }
      
        try {
          const { data, error } = await supabase.storage
            .from('job-board-public')
            .upload(`public/${file.name}`, file, {
              cacheControl: "3600",
              upsert: false
            });
      
          if (error) {
            console.error("Supabase Upload Error:", error);
            return;
          }
      
          console.log("File Uploaded Successfully:", data);
      
          
          setCandidateFormData({
            ...candidateFormData,
            resume: data?.path || ""
          });
        } catch (err) {
          console.error("Unexpected Error during upload:", err);
        }
      }
      

    useEffect(()=>{

        if(file) handleUploadPdfToSupabase()
    }, [file])
    

    function handleTabChange(value) {
        setCurrentTab(value);
    }

    console.log(recruiterFormData, 'recruiterFormData');

    function handleRecruiterFormValid() {
        return (
            recruiterFormData && 
            recruiterFormData.name.trim() !== "" && 
            recruiterFormData.companyName.trim() !== "" && 
            recruiterFormData.companyRole.trim() !== ""
        );
    }

    function handleCandidateFormValid() {
       
        return Object.values(candidateFormData).every(value => value.trim() !== "");
      }
      

    async function createProfile(){
        const data = currentTab === 'candidate' ? {
            candidateInfo : candidateFormData,
            role : 'candidate',
            isPremiumUser : false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
        
        } : {
            recruiterInfo: recruiterFormData,
            role: 'recruiter',
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
        }
        await createProfileAction(data, '/onboard')
    }
    
    

      return (
            <div className="bg-white">
                <Tabs value={currentTab} onValueChange={handleTabChange}>
                    <div className="w-full">
                         <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                    Welcome to onboarding
                              </h1>
                              <TabsList>
                                    <TabsTrigger value='candidate'>Candidate</TabsTrigger>
                                    <TabsTrigger value='recruiter'>Recruiter</TabsTrigger>
                              </TabsList>
                         </div> 
                    </div>
                    <TabsContent value="candidate">
                        <CommonForm 
                            formControls={candidateOnboardFormControls}
                            buttonText={'Onboard as candidate'}
                            formData={candidateFormData}
                            setFormData={setCandidateFormData}
                            handleFileChange={handleFileChange}
                            isBtnDisabled={!handleCandidateFormValid()}
                            action={createProfile}
                        />
                    </TabsContent>
                    <TabsContent value="recruiter">
                        <CommonForm 
                            formControls={recruiterOnboardFormControls}
                            buttonText={'Onboard as recruiter'}
                            formData={recruiterFormData}
                            setFormData={setRecruiterFormData}
                            isBtnDisabled={!handleRecruiterFormValid()}
                            action={createProfile}
                        />
                    </TabsContent>
                </Tabs>
            </div>
      )

}

export default OnBoard;