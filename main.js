// 
// Simulate Data Fetching Using Promises:
// Create three asynchronous functions to simulate data fetching for user profiles, posts, and comments.
// Each function should return a promise that resolves after a delay, simulating a time-intensive operation 
// (e.g., fetching data from a remote server).

const profiles = [
    {
        id: 17,
        name: "Jeremy Matthews"
    },
    {
        id: 23,
        name: "Peter Wilson"
    }        
]

const posts = [
    {
        id: 10,
        creator: 17,
        body: 'Join value picture scene above environmental. Population trade return. Interesting American player coach often ahead alone.'
    },
    {
        id: 11,
        creator: 17,
        body: 'Interesting pressure check skill term. Identify benefit little TV.'
    },
    {
        id: 12,
        creator: 2,
        body: 'Hot rate dark special. Security bar wife management entire structure red. Art my participant clear suggest court why. Thank owner decade level might field form.'
    },
    {
        id: 13,
        creator: 23,
        body: 'Then human nor technology toward expect again else. Too prove affect.'
    }
]

const comments = [
    {
        id: 3847,
        postId: 11,
        body: 'Ten program family instead condition together. Improve treat but prepare them space onto.'
    },
    {
        id: 3847,
        postId: 11,
        body: 'Catch into forget dog. Company short minute. Including have consumer arm someone face interesting.'
    },
    {
        id: 3847,
        postId: 13,
        body: 'Serve main effort.'
    }
]


function getUserProfiles() {
    return new Promise (resolve => {
        setTimeout(() =>{
            resolve(profiles)  
        }, 2000)
    })      
}


function getUserComments(){
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(comments)
        }, 2000)
    })   
}


function getUserPosts(){
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve(posts)  
        }, 2000)
    })
}




// Implement Sequential and Parallel Data Fetching:
// Fetch the data using both sequential and parallel techniques. For example, you could fetch the user profile first, 
// then the posts for that user, and finally, the comments on each post in a sequential flow.
// In another instance, fetch the user, posts, and comments in parallel, observing how they differ in response time and behaviour.


// Sequential
function sequential(userId){
    getUserProfiles().then(profiles => {
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)
        getUserPosts().then(posts => {
            const userPosts = posts.filter((post) => post.creator === userId)
            console.log("User Posts", userPosts)
            getUserComments().then(comments => {
                let userComments = []
                userPosts.forEach(post => {
                userComments = comments.filter((comment) => comment.postId === post.id)    
                })
                console.log("User Comments are", userComments)
            })
        })
    })
}

// sequential(17)

// Parallel
function parallel(userId){
    Promise.all([getUserProfiles(), getUserPosts(), getUserComments()])
    .then(([profiles, posts, comments]) => {
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)

        const userPosts = posts.filter((post) => post.creator === userId)
        console.log("User Posts", userPosts)

        let userComments = []
        userPosts.forEach(post => {
        userComments = comments.filter((comment) => comment.postId === post.id)    
        })
        console.log("User Comments are", userComments)
    })
}

// parallel(23)






// Refactor with Async/Await:
// Rewrite each function to use async/await syntax instead of .then.
// Use try...catch blocks to handle errors and provide custom error messages for each failure point.


function delay1(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function getUserProfiles1() {
    try {
     await delay1(3000)
    return profiles   
    }catch (error){
        console.error("Error fetching profiles")
    }
    
}


async function getUserComments1(){
    try {
    await delay1(3000)
    return comments    
    } catch (error){
        console.error("Error fetching comments")
    }
    
}


async function getUserPosts1(){
    try{
      await delay1(3000)
      return posts  
    } catch(error){
        console.error("error fetching Posts", error)
    }
}

// sequential 
async function sequentialAsyncSyntax(userId){
    try{
        const profiles = await getUserProfiles1()
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)

        const posts = await getUserPosts1()
        const userPosts = posts.filter((post) => post.creator === userId)
        console.log("User Posts", userPosts)

        const comments = await getUserComments1()
        let userComments = []
        userPosts.forEach(post => {
            userComments = comments.filter((comment) => comment.postId === post.id)    
        })
        console.log("User Comments are", userComments)
    } catch(error){
        console.error("Error fetching")
    }
}


// parallel
async function parallelAsyncSyntax(userId){
    try{
        const [profiles, posts, comments] = await Promise.all([
            getUserProfiles1(),
            getUserPosts1(),
            getUserComments1()
        ])
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)

        const userPosts = posts.filter((post) => post.creator === userId)
        console.log("User Posts", userPosts)
        
        let userComments = []
        userPosts.forEach(post => {
        userComments = comments.filter((comment) => comment.postId === post.id)    
        })
        console.log("User Comments are", userComments)
    } catch(error){
        console.error("Error fetching")
    }

}

parallelAsyncSyntax(17)





// Error Handling Simulation:
// Modify your functions so that one or more of them may randomly reject (fail). For instance, the fetchComments function might fail randomly with an error message like "Failed to fetch comments."
// Handle each error case gracefully, displaying a relevant message without stopping the entire application.




// Chaining Async Functions:
// Design a primary getUserContent function that fetches all the data in sequence and logs it step-by-step, combining the results at the end.
// Inside this function, call each async function in order, awaiting each result and logging a message like "User profile retrieved," "Posts retrieved," etc., to visualize the sequence.