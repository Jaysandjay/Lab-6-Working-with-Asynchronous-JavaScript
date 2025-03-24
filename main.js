// 
// Simulate Data Fetching Using Promises:
// Create three asynchronous functions to simulate data fetching for user profiles, posts, and comments.
// Each function should return a promise that resolves after a delay, simulating a time-intensive operation 
// (e.g., fetching data from a remote server).

console.log("Simulate Data Fetching Using Promises:")


function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}


async function getUserProfile() {
    await delay(3000)
    // Return is a promise
    return {
        id: 123,
        url: "Fake URL",
        name: "John"
    }
}


async function getUserComments(postId){
    await delay(3000)
    // Return is a promise
    return ["comment1", "comment2", "comment3"]
}


async function getUserPosts(userId){
    await delay(3000)
    // Return is a promise
    return [
        {
            postId: 1,
            post: "Hello"
        },
        {
            postId: 2,
            post: "This is another post"
        }
    ]
}

const profile = await getUserProfile()
console.log("user profile", profile)

const posts = await getUserPosts(profile.id)
console.log("post by user id", posts)

const comments = await getUserComments( posts[0].postId)
console.log("get comment by post id", comments)

















// Implement Sequential and Parallel Data Fetching:
// Fetch the data using both sequential and parallel techniques. For example, you could fetch the user profile first, then the posts for that user, and finally, the comments on each post in a sequential flow.
// In another instance, fetch the user, posts, and comments in parallel, observing how they differ in response time and behaviour.




// Refactor with Async/Await:
// Rewrite each function to use async/await syntax instead of .then.
// Use try...catch blocks to handle errors and provide custom error messages for each failure point.



// Error Handling Simulation:
// Modify your functions so that one or more of them may randomly reject (fail). For instance, the fetchComments function might fail randomly with an error message like "Failed to fetch comments."
// Handle each error case gracefully, displaying a relevant message without stopping the entire application.




// Chaining Async Functions:
// Design a primary getUserContent function that fetches all the data in sequence and logs it step-by-step, combining the results at the end.
// Inside this function, call each async function in order, awaiting each result and logging a message like "User profile retrieved," "Posts retrieved," etc., to visualize the sequence.