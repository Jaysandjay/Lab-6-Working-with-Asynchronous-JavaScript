// 
// Simulate Data Fetching Using Promises:
// Create three asynchronous functions to simulate data fetching for user profiles, posts, and comments.
// Each function should return a promise that resolves after a delay, simulating a time-intensive operation 
// (e.g., fetching data from a remote server).


// USED FAKER.JS TO GATHER FAKE DATA
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
            console.log(profiles)
            resolve(profiles)  
        }, 2000)
    })      
}


function getUserComments(){
    return new Promise (resolve => {
        setTimeout(() => {
            console.log(comments)
            resolve(comments)
        }, 2000)
    })   
}


function getUserPosts(){
    return new Promise(resolve => {
        setTimeout(()=> {
            console.log(posts)
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


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function getUserProfilesWithAsync() {
    try {
        await delay(3000)
        console.log(profiles)
        return profiles   
    }catch (error){
        console.error("Error fetching profiles")
        return error
    }
}


async function getUserCommentsWithAsync(){
    try {
        await delay(3000)
        console.log(comments)
        return comments    
    } catch (error){
        console.error("Error fetching comments")
        return error
    }
    
}


async function getUserPostsWithAsync(){
    try{
        await delay(2000)
        console.log(posts)
        return posts  
    } catch(error){
        console.error("error fetching Posts", error)
        return error
    }
}


// sequential 
async function sequentialAsyncSyntax(userId){
    try{
        const profiles = await getUserProfilesWithAsync()
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)

        const posts = await getUserPostsWithAsync()
        const userPosts = posts.filter((post) => post.creator === userId)
        console.log("User Posts", userPosts)

        const comments = await getUserCommentsWithAsync()
        let userComments = []
        userPosts.forEach(post => {
            userComments = comments.filter((comment) => comment.postId === post.id)    
        })
        console.log("User Comments are", userComments)
    } catch(error){
        console.error("Error fetching")
    }
}
// sequentialAsyncSyntax(17)


// parallel
async function parallelAsyncSyntax(userId){
    try{
        const [profiles, posts, comments] = await Promise.all([
            getUserProfilesWithAsync(),
            getUserPostsWithAsync(),
            getUserCommentsWithAsync()
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

// parallelAsyncSyntax(17)


// Error Handling Simulation:
// Modify your functions so that one or more of them may randomly reject (fail). For instance, the fetchComments function might fail 
// randomly with an error message like "Failed to fetch comments."
// Handle each error case gracefully, displaying a relevant message without stopping the entire application.

// sequential 
async function sequentialAsyncSyntaxRandom(userId){

    // Create Failure at random
    const profileFail = Math.floor(Math.random() * 2)
    const postFail = Math.floor(Math.random() * 2)
    const commentFail = Math.floor(Math.random() * 2)
    // console.log(profileFail)
    // console.log(postFail)
    // console.log(commentFail)

    if(profileFail){
        console.error("Failure with fetching profiles")
        throw "Failure with fetching profiles"
    }else{
        const profiles = await getUserProfilesWithAsync()
        const user = profiles.find((profile) => profile.id === userId)
        console.log("User", user)   
    }   

    if(postFail){
        console.error("Failure with fetching posts")
        throw "Failure with fetching posts"
    }else {
        const posts = await getUserPostsWithAsync()
        const userPosts = posts.filter((post) => post.creator === userId)
        console.log("User Posts", userPosts)  
    }
    
    if(profileFail){
        console.error("Failure fetching comments due to failure of fetching profiles")
        throw "Failure fetching comments due to failure of fetching profiles"
    }else if(commentFail){
        console.error("Failure fetching comments")
        throw "Failure fetching comments"
    }else {
        const comments = await getUserCommentsWithAsync()
        let userComments = []
        userPosts.forEach(post => {
            userComments = comments.filter((comment) => comment.postId === post.id)    
        })
        console.log("User Comments are", userComments)  
        return(userComments)
    }
}

// sequentialAsyncSyntaxRandom(17)



// For the parallel function, make each promise randomly fail within its code  

const profileFail = Math.floor(Math.random() * 2)
const postFail = Math.floor(Math.random() * 2)
const commentFail = Math.floor(Math.random() * 2)



async function getUserProfilesRandom() {
    if(profileFail){
        console.error("Failure in fetching profiles")
        throw "Failure in fetching profiles"
    }else{
        await delay(1000)
        return profiles   
    }
}


async function getUserPostsRandom(){
    if(postFail){
        console.error("Failure in fetching posts")
        throw "Failure in fetching posts"
    }else{
        await delay(1000)
        return posts  
    }
}


async function getUserCommentsRandom(){
    if(postFail){
        console.error("Cant fetch comments due to failure of fetching posts")
        throw "Cant fetch comments due to failure of fetching posts"
    }else if (commentFail){
        console.error("Faliure in fetching comments")
        throw "Faliure in fetching comments"
    }else{
        await delay(1000)
        return comments    
    }
}

async function parallelAsyncSyntaxRandom(userId){
    try{
        const [profiles, posts, comments] = await Promise.all([
            getUserProfilesRandom(),
            getUserPostsRandom(),
            getUserCommentsRandom()
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



// Chaining Async Functions:
// Design a primary getUserContent function that fetches all the data in sequence and logs it step-by-step, combining the results at the end.
// Inside this function, call each async function in order, awaiting each result and logging a message like "User profile retrieved," "Posts retrieved," etc., to visualize the sequence.

async function getUserContent(userId){
    let content = []
    console.log("Fetching content")
    try{
        getUserProfiles().then(profiles => {
            const user = profiles.find((profile) => profile.id === userId)
            console.log("User profile retrieved")
            content.push(user)
            return user
        }).then(() => {
            getUserPosts().then(posts => {
                const userPosts = posts.filter((post) => post.creator === userId)
                console.log("User Posts retrieved")
                content.push(userPosts)
                return userPosts
            }).then((userPosts) =>{
                getUserComments().then(comments => {
                    let userComments = []
                    userPosts.forEach(post => {
                    userComments = comments.filter((comment) => comment.postId === post.id)    
                    })
                    console.log("User Comments retrieved")
                    content.push(userComments)
                    return userComments
                })
                .then(() => {
                    console.log(content)
                })
            })
        })
    }catch (error){
        console.error("Failure to fetch data")
    }
}

// getUserContent(17)



// JS For HTML

// Question 1
const q1Profiles = document.getElementById("q1-profiles")
const q1Comments = document.getElementById("q1-comments")
const q1Posts = document.getElementById("q1-posts")

q1Profiles.addEventListener("click", getUserProfiles)
q1Comments.addEventListener("click", getUserComments)
q1Posts.addEventListener("click", getUserPosts)


// Question 2
const q2Sequential= document.getElementById("q2-sequential") 
const q2Parallel = document.getElementById("q2-parallel")

q2Sequential.addEventListener("click", function() {sequential(17)})
q2Parallel.addEventListener("click", function () {parallel(23)})


// Question 3
const q3Profiles = document.getElementById("q3-profiles")
const q3Posts = document.getElementById("q3-posts")
const q3Comments = document.getElementById("q3-comments")
const q3Sequential = document.getElementById("q3-sequential")
const q3Parallel = document.getElementById("q3-parallel")

q3Profiles.addEventListener("click", getUserProfilesWithAsync)
q3Posts.addEventListener("click", getUserPostsWithAsync)
q3Comments.addEventListener("click", getUserCommentsWithAsync)
q3Sequential.addEventListener("click", function(){sequentialAsyncSyntax(17)})
q3Parallel.addEventListener("click", function(){parallelAsyncSyntax(23)})


// Question 4
const q4Sequential = document.getElementById("q4-sequential")
const q4Parallel = document.getElementById("q4-parallel")

q4Sequential.addEventListener("click", function(){sequentialAsyncSyntaxRandom(17)})
q4Parallel.addEventListener("click", function(){parallelAsyncSyntaxRandom(23)})


// Question 5
const q5UserProfile = document.getElementById("q5-userProfile")

q5UserProfile.addEventListener("click", function(){getUserContent(17)})