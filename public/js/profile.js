console.log("hello")
document.querySelector("#newBlog").addEventListener("submit", e=>{
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

document.querySelector("#deleteBTN").addEventListener("click", e =>{
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

document.querySelector("#newBlog").addEventListener("update", e =>{
    e.preventDefault()
    const blogObj = {
        title:document.querySelector("#title").value,
        body:document.querySelector("#body").value,
    }
    fetch("/api/blogs/:id", {
        method:"UPDATE",
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