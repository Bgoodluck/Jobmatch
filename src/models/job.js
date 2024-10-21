import mongoose from 'mongoose'


const JobSchema = new mongoose.Schema({
    companyName: String,
    jobTitle: String,
    jobDescription: String,
    jobLocation: String,
    jobType: String,
    jobExperience: String,
    jobSkills: String,
    jobCriteria: String,
    jobResponsibilities: String,
    jobBenefits: String,
    jobSalary: String,
    recruiterId: String,
    applicants:[
        {
            name: String,
            email: String,
            userId: String,
            status: String
        }
    ]
})


const Job = mongoose.models.Job || mongoose.model('Job', JobSchema)


export default Job;