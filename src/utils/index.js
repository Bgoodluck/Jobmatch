import qs from 'query-string'

export const recruiterOnboardFormControls = [
    {
         label: 'Name',
         name: 'name',
         placeholder: 'Enter your name',
         componentType: 'input'        
    },
    {
         label: 'Company Name',
         name: 'companyName',
         placeholder: 'Enter your company name',
         componentType: 'input'        
    },
    {
         label: 'Company Role',
         name: 'companyRole',
         placeholder: 'Enter your company role',
         componentType: 'input'        
    }
 ];

 export const initialRecruiterFormData = {
    name: '',
    companyName: '',
    companyRole: '',
    
 }


 export const candidateOnboardFormControls = [
    {
         label: 'Resume',
         name: 'resume',
         placeholder: 'Upload your resume',
         componentType: 'file'        
    },
    {
         label: 'Name',
         name: 'name',
         placeholder: 'Enter your name',
         componentType: 'input'
    },
    {
         label: 'Current Company',
         name: 'currentCompany',
         placeholder: 'Enter your current company',
         componentType: 'input'
    },
    {
         label: 'Current Job Location',
         name: 'currentJobLocation',
         placeholder: 'Enter your current job location',
         componentType: 'input'
    },
    {
         label: 'Prefered Job Location',
         name: 'preferedJobLocation',
         placeholder: 'Enter your prefered job location',
         componentType: 'input'
    },
    {
         label: 'Current Salary',
         name: 'currentSalary',
         placeholder: 'Enter your current salary',
         componentType: 'input'
    },
    {
         label: 'Notice Period',
         name: 'noticePeriod',
         placeholder: 'Enter your notice period',
         componentType: 'input'
    },
    {
         label: 'Area Of Expertise',
         name: 'areaOfExpertise',
         placeholder: 'Enter your area of expertise',
         componentType: 'input'
    },
    {
         label: 'Previous Companies Worked',
         name: 'previousCompanyWorked',
         placeholder: 'Enter the previous company worked',
         componentType: 'input'
    },
    {
         label: 'Total Years Of Experience',
         name: 'totalYearsOfExperience',
         placeholder: 'Enter the total years of experience',
         componentType: 'input'
    },
    {
         label: 'College',
         name: 'college',
         placeholder: 'Enter your college',
         componentType: 'input'
    },
    {
         label: 'College Location',
         name: 'collegeLocation',
         placeholder: 'Enter your college location',
         componentType: 'input'
    },
    {
         label: 'Graduation Year',
         name: 'graduationYear',
         placeholder: 'Enter your gradaution year',
         componentType: 'input'
    },
    {
         label: 'Linkedin Profile',
         name: 'linkedinProfile',
         placeholder: 'Enter your linkedin profile',
         componentType: 'input'
    },
    {
         label: 'Social Media Profile',
         name: 'socialMediaProfile',
         placeholder: 'Enter your social media profile',
         componentType: 'input'
    },
 ]

 export const initialCandidateFormData = {
    resume: '',
    name: '',
    currentCompany: '',
    currentJobLocation: '',
    preferedJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    areaOfExpertise: '',
    previousCompanyWorked: '',
    totalYearsOfExperience: '',
    college: '',
    collegeLocation: '',
    graduationYear: '',
    linkedinProfile: '',
    socialMediaProfile: '',    
 }

 export const initialCandidateAccountFormData = {
    name: '',
    currentCompany: '',
    currentJobLocation: '',
    preferedJobLocation: '',
    currentSalary: '',
    noticePeriod: '',
    areaOfExpertise: '',
    previousCompanyWorked: '',
    totalYearsOfExperience: '',
    college: '',
    collegeLocation: '',
    graduationYear: '',
    linkedinProfile: '',
    socialMediaProfile: '',    
 }

export const postNewJobFormControls = [
    {
       label: 'Company Name',
       name: 'companyName',
       placeholder: 'Enter the company name',
       componentType: 'input',
       disabled: true
    },
    {
       label: 'Job Title',
       name: 'jobTitle',
       placeholder: 'Enter the Job Title',
       componentType: 'input'
    },
    {
       label: 'Job Description',
       name: 'jobDescription',
       placeholder: 'Enter the Job Description',
       componentType: 'input'
    },
    {
       label: 'Job Location',
       name: 'jobLocation',
       placeholder: 'Enter the Job Location',
       componentType: 'input'
    },
    {
       label: 'Job Type',
       name: 'jobType',
       placeholder: 'Enter the Job Type',
       componentType: 'input'
    },
    {
       label: 'Job Experience',
       name: 'jobExperience',
       placeholder: 'Enter the Job Experience',
       componentType: 'input'
    },
    {
       label: 'Job Skills',
       name: 'jobSkills',
       placeholder: 'Enter the Job Skills',
       componentType: 'input'
    },
    {
       label: 'Job Criteria',
       name: 'jobCriteria',
       placeholder: 'Enter the Job Criteria',
       componentType: 'input'
    },
    {
       label: 'Job Responsibilities',
       name: 'jobResponsibilities',
       placeholder: 'Enter the Job Responsibilities',
       componentType: 'input'
    },
    {
       label: 'Job Benefits',
       name: 'jobBenefits',
       placeholder: 'Enter the Job Benefits',
       componentType: 'input'
    },
    {
       label: 'Job Salary',
       name: 'jobSalary',
       placeholder: 'Enter the Job Salary',
       componentType: 'input'
    },
]


export const initialPostNewJobFormData = {
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    jobType: '',
    jobExperience: '',
    jobSkills: '',
    jobCriteria: '',
    jobResponsibilities: '',
    jobBenefits: '',
    jobSalary: '',
}


export const filterMenuDataArray = [
     {
          id : 'companyName',
          label: 'Company'
     },
     {
          id : 'jobTitle',
          label: 'Job'
     },
     {
          id : 'jobType',
          label: 'Type'
     },
     {
          id : 'jobLocation',
          label: 'Location'
     }    
];



export function formUrlQuery({params, dataToAdd}){
     let currentURL = qs.parse(params);

     if (Object.keys(dataToAdd).length > 0) {
          Object.keys(dataToAdd).map((key) => {
               if(dataToAdd[key].length === 0) delete currentURL[key];
               else currentURL[key] = dataToAdd[key].join(",");
          })
     }
     return qs.stringifyUrl({
          url : window.location.pathname,
          query: currentURL,
     },
     {
          skipNull: true,
     }
)
}

export const membershipPlans = [
     {
          heading: 'Basic', 
          color: '#4169E1',         
          price: 19,
          type: 'basic',
          features: ['50 Jobs', '50 Candidates', '50 Reviews', '100 Applications', '100 Interviews']
     },
     {
          heading: 'Silver',
          color: '#71706e',          
          price: 39,
          type: 'silver',
          features: ['100 Jobs', '100 Candidates', '100 Reviews', '200 Applications', '200 Interviews']
     },
     {
          heading: 'Platinum',
          color: '#a0b2c6',          
          price: 59,
          type: 'platinum',
          features: ['250 Jobs', '200 Candidates', '250 Reviews', '400 Applications', '400 Interviews']
     },
     {
          heading: 'Gold',
          color: '#FFD700',          
          price: 79,
          type: 'gold',
          features: {
               recruiter: ['450 Jobs', '500 Candidates', '500 Reviews', '1000 Applications', '1000 Interviews'],
               candidate: ['300 Jobs', '300 Candidates', '300 Reviews', '750 Applications', '750 Interviews'],
             },
     },
     
]