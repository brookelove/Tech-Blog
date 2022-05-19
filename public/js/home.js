const commentBTNS = document.querySelectorAll("#commentBTN")
commentBTNS.forEach((el)=>{
    el.addEventListener("click", e =>{
        e.preventDefault()
        const post = e.target.value;
        const commentObj = {
            blogid: post,
            body: document.querySelector("#comment").value,
        }
        console.log(post);
        console.log(commentObj);
        fetch(`/api/blogs/comment`, {
            method:"POST",
            body:JSON.stringify(commentObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok) {
                // try parsing the object 
                location.reload()
            } else {
                alert("error happened")
            }
        })
    })
}) 
