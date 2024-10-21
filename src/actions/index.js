"use server"

import { stripeSK } from "@/constant";
import connectDB from "@/database"
import Application from "@/models/applications";
import Feed from "@/models/feed";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


const stripe = require('stripe')(stripeSK);

// creating profile action

export async function createProfileAction(formData, pathToRevalidate){
    await connectDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate)
}


export async function fetchProfileAction(id) {
    await connectDB();
    const result = await Profile.findOne({ userId : id });

    return JSON.parse(JSON.stringify(result));
}


// creating job action
export async function postNewJobAction(formData, pathToRevalidate){
    await connectDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate)
}


// fetching job action
// recruiters view

export async function fetchJobsForRecruiterAction(id){
    await connectDB();
    const result = await Job.find({ recruiterId : id });

    return JSON.parse(JSON.stringify(result))
}


// fetching job action
// candidate view

export async function fetchJobsForCandidateAction(filterParams= {}){
    await connectDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey)=>{
        updatedParams[filterKey] = {$in: filterParams[filterKey].split(',')}
    })
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});

    return JSON.parse(JSON.stringify(result));
}

// creating job application logic

export async function  createJobApplicationAction(data, pathToRevalidate) {
    await connectDB();
    await Application.create(data);
    revalidatePath(pathToRevalidate);
}


// fetching job application for candidate

export async function fetchJobApplicationsForCandidate(candidateID) {
    await connectDB();
    const result = await Application.find({candidateUserID : candidateID});

    return JSON.parse(JSON.stringify(result));
}

// fetching job applicants for the recruiter

export async function fetchJobApplicantsForRecruiter(recruiterID){
    await connectDB();
    const result = await Application.find({recruiterUserID : recruiterID})

    return JSON.parse(JSON.stringify(result));
}

// get candidate details by candidate id

export async function getCandidateDetailsByIDAction(currentCandidateID){
    await connectDB();
    const result = await Profile.findOne({userId: currentCandidateID});

    return JSON.parse(JSON.stringify(result));
}


// UPDATING JOB APPLICATION
export async function updateJobApplicationAction(data, pathToRevalidate){
    await connectDB();
  const {
    recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate,
        _id
  } = data;
  await Application.findOneAndUpdate(
    {_id : _id}, {
        recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate
    },
    { new: true}
);
revalidatePath(pathToRevalidate)
}


// creating a filter for the categories

export async function createFilterCategoryAction(){
    await connectDB();
    const result = await Job.find({});

    return JSON.parse(JSON.stringify(result));
 
}


// UPDATING OF PROFILE ACTION

export async function updateProfileAction(data, pathToRevalidate) {
    await connectDB();
    const {
         userId,
         role,
         email,
         isPremiumUser,
         memberShipType,
         memberShipStartDate,
         memberShipEndDate,
         recruiterInfo,
         candidateInfo,
         _id    
        } = data;

    await Profile.findOneAndUpdate(
        {
        _id: _id
        },
        {
         userId,
         role,
         email,
         isPremiumUser,
         memberShipType,
         memberShipStartDate,
         memberShipEndDate,
         recruiterInfo,
         candidateInfo
        },
        {new: true}
    )

    revalidatePath(pathToRevalidate);
}


// creating a stripe price id based on premium selection of classes

export async function createPriceIdAction(data){
    const session = await stripe.prices.create({
        currency : 'usd',
        unit_amount : data?.amount *100,
        recurring : {
            interval : 'year'
        },
        product_data : {
            name : 'Premium Plan'
        }
    })
    return {
        success : true,
        id: session?.id
    }
}

// creating a payment logic

export async function createStripePaymentAction(data){
    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items : data?.lineItems,
        mode : "subscription",
        success_url : `${process.env.URL}/membership` + "?status=success",
        cancel_url : `${process.env.URL}/membership` + "?status=cancel",
        customer_email : data?.email
    });

    return {
        success : true,
        id : session?.id,
    }
}



// create feed post action

export async function createFeedPostAction(data, pathToRevalidate){
    await connectDB();
    await Feed.create(data);
    revalidatePath(pathToRevalidate)
}

// fetching feed posts
export async function fetchAllFeedPostsAction(){
    await connectDB();
    const result = await Feed.find({});

    return JSON.parse(JSON.stringify(result));
}


// update post action

export async function updateFeedPostAction(data, pathToRevalidate){
    await connectDB();
    const {
        userId,
        userName,
        message,
        image,
        likes,
        _id
    } = data;

    await Feed.findOneAndUpdate(
        {_id : _id}, {
        userId,
        userName,
        message,
        image,
        likes,
    },
    { new: true}
);
revalidatePath(pathToRevalidate)
}