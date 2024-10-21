const { default: mongoose } = require("mongoose");



const ProfileSchema = new mongoose.Schema({
    userId: String,
    role: String,
    email: String,
    isPremiumUser: Boolean,
    memberShipType: String,
    membershipStartDate: String,
    membershipEndDate: String,
    recruiterInfo: {
        name: String,
        companyName: String,
        companyRole: String
    },
    candidateInfo: {
        name: String,       
        currentCompany: String,
        currentJobLocation: String,
        preferedJobLocation: String,
        currentSalary: String,
        noticePeriod: String,
        areaOfExpertise: String,
        previousCompanyWorked: String,
        totalYearsOfExperience: String,
        college: String,
        collegeLocation: String,
        graduationYear: String,
        linkedinProfile: String,
        socialMediaProfile: String,
        resume: String
    }
})

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)


export default Profile;