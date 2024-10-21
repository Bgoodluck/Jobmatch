// import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
// import Feed from "@/components/feed";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";


// async function FeedPage() {

//     const user = currentUser();
//     const profileInfo = await fetchProfileAction(user?.id)

//     if (!profileInfo)redirect('/onboard')
//     console.log(profileInfo)

//     const allFeedPosts = await fetchAllFeedPostsAction();

//     return ( 
//         <Feed
//            user={JSON.parse(JSON.stringify(user))}
//            profileInfo={profileInfo}
//            allFeedPosts={allFeedPosts} 
//         />
//      );
// }

// export default FeedPage;


import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function FeedPage() {
    try {
        const user = await currentUser();
        
        // Debugging step 1: Log the user object
        console.log("User:", user);

        // Ensure user is loaded
        if (!user) {
            console.error("User not found");
            return redirect('/login'); // If no user, redirect to login or handle accordingly
        }

        // Debugging step 2: Log before fetching profile
        console.log("Fetching profile for user ID:", user.id);

        const profileInfo = await fetchProfileAction(user.id);

        // Debugging step 3: Log the result of profile fetch
        console.log("Profile Info:", profileInfo);

        // If profile is missing, redirect to onboarding
        if (!profileInfo) {
            console.error("Profile not found. Redirecting to onboarding...");
            return redirect('/onboard');
        }

        // Fetch feed posts
        const allFeedPosts = await fetchAllFeedPostsAction();

        // Debugging step 4: Log feed posts data
        console.log("All Feed Posts:", allFeedPosts);

        // Render the Feed component
        return (
            <Feed
                user={JSON.parse(JSON.stringify(user))}
                profileInfo={profileInfo}
                allFeedPosts={allFeedPosts}
            />
        );

    } catch (error) {
        // Debugging step 5: Log any errors that occurred during the process
        console.error("Error occurred while loading the feed page:", error);
        return redirect('/error'); // Redirect to error page or handle accordingly
    }
}

export default FeedPage;
