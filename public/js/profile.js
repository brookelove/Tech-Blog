console.log("hello")
const deleteBTNS = document.querySelectorAll("#deleteBTN");
const updateBTNS = document.querySelector("#updateBTN")
document.querySelector("#newBlog").addEventListener("submit",e=>{
    e.preventDefault()
    const blogObj = {
        title:document.querySelector("#title").value,
        body:document.querySelector("#body").value,
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

deleteBTNS.forEach ((el)=>{
    el.addEventListener("click", e =>{
        e.preventDefault()
        console.log("delete button===================")
        console.log(e.target.value);
        const post = e.target.value;
        fetch(`/api/blogs/${post}`, {
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound")
            }
        })
    })
})

updateBTNS.forEach ((el) => {
    el.addEventListener("click", e =>{
        // create element 
        // set attribute 
        // append to the page
        e.preventDefault()
        const blog_id = updateBTN.value;
        const edit = {
            title: title.value,
            body: body.value,
        }
        fetch(`/api/blogs/${blog_id}`, {
            method:"PUT",
            body:JSON.stringify(edit),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload('profile')
            } else {
                alert("trumpet sound")
            }
        })
    })
})
