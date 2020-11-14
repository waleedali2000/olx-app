function signupPage(){
    window.location.assign("./signup.html")
}
function loginPage(){
    window.location.assign("./signin.html")
}




function postAd(){
    var category = document.querySelector('option:checked').innerText;
    var title = document.getElementById("title").value;
    var description = document.getElementById("descrip").value;
    var price = document.getElementById("price").value;
    var contact = document.getElementById("contact").value;
    var image = document.getElementById('file').files[0];
    document.getElementById("postLoader").style.display = "block"
    var userId = firebase.auth().currentUser.uid;
        var adDetails = {
            category,
            title,
            description,
            contact,
            price,
            userId
      }
    console.log(adDetails)
     var storageRef = firebase.storage().ref().child(`Posts Pictures/${image.name}`)
      storageRef.put(image).then((url)=>{
        url.ref.getDownloadURL().then((refUrl)=>{
        adDetails.picture = refUrl
        console.log(userId)
    firebase.database().ref('AllPosts/').child(category).push(adDetails);
    firebase.database().ref(`USERS/${userId}`).child('YourPosts').push(adDetails).then(()=>{
        document.getElementById("postLoader").style.display = "none"
        swal("Posted","Ad Posted!", "success").then(()=>{
            window.location.reload();
        })
        })
        })
        })
}

function yourPost(){
    var postDiv = document.getElementById("myPosts");
    document.getElementById("postModal").style.display = "block";
    var id = firebase.auth().currentUser.uid;
    console.log(id)
    firebase.database().ref(`USERS/${id}/`).child('YourPosts').once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            postDiv.innerHTML += `
            <div style = "text-align: left;" class = "quizes">
            <img src = "${a[i].picture}" width = 100>
            <p>Category: ${a[i].category}</p>
            <p>Title: ${a[i].title}</p>
            <p>Description: ${a[i].description}</p>
            <p>Price: ${a[i].price}</p>
            <p>Contact: ${a[i].contact}</p>
            </div>
            `
        }
    })
}

function firebaseData(){
    firebase.database().ref('AllPosts').once("value", data=>{
        var a = data.val()
        for(var key in a){
            for(var key2 in a[key]){
                localStorage.setItem("allData", JSON.stringify(a))
                document.getElementById("mainDiv").innerHTML += `
                <div class = "quizes">
    <img style = "padding: 10px;" src = ${a[key][key2].picture} width = "250">
    <hr>
    <div style = "text-align: left; margin: 20px;">
    <h2>TITLE: </h2><p><li>${a[key][key2].title}</li></p>
    <h2>CATEGORY: </h2><p><li>${a[key][key2].category}</li></p>
    <h2>PRICE: </h2><p><li>${a[key][key2].price}/-</li></p>
    <h2>DESCRIPTION: </h2><p><li>${a[key][key2].description}</li></p>
    <h2>CONTACT: </h2><p><li>${a[key][key2].contact}</li></p>
    </div>
    </div>
    `
            }
        }
    })
}

function allData(){
    if(navigator.onLine){
        firebaseData();
    }
    else{
        offline();
    }
    
}
function offline(){
    // var arr = [];
      var abc = localStorage.getItem("allData");
      var xyx = JSON.parse(abc)
      console.log(xyx)
      for(var key in xyx){
          console.log(xyx[key])
          for(var key2 in xyx[key]){
              console.log(xyx[key][key2])
              document.getElementById("mainDiv").innerHTML += `
                <div class = "quizes">
    <img style = "padding: 10px;" src = ${xyx[key][key2].picture} width = "250">
    <hr>
    <div style = "text-align: left; margin: 20px;">
    <h2>TITLE: </h2><p><li>${xyx[key][key2].title}</li></p>
    <h2>CATEGORY: </h2><p><li>${xyx[key][key2].category}</li></p>
    <h2>PRICE: </h2><p><li>${xyx[key][key2].price}/-</li></p>
    <h2>DESCRIPTION: </h2><p><li>${xyx[key][key2].description}</li></p>
    <h2>CONTACT: </h2><p><li>${xyx[key][key2].contact}</li></p>
    </div>
    </div>
    `
          }
      }
}
    


function bikes(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('bikes').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function books(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('books').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function cars(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('cars').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function electronic(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('electronic').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function furniture(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('furniture').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function jobs(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('jobs').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function mobiles(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('mobiles').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}
function properties(){
    var name = document.querySelector('title').innerText;
    firebase.database().ref(`AllPosts/${name}`).once("value", data=>{
        var a = data.val();
        console.log(a)
        for(var i in a){
            document.getElementById('properties').innerHTML +=`
            <div class = "quizes">
            <img style = "padding: 10px;" src = ${a[i].picture} width = "250">
            <hr>
            <div style = "text-align: left; margin: 20px;">
            <h2>TITLE: </h2><p><li>${a[i].title}</li></p>
            <h2>CATEGORY: </h2><p><li>${a[i].category}</li></p>
            <h2>PRICE: </h2><p><li>${a[i].price}/-</li></p>
            <h2>DESCRIPTION: </h2><p><li>${a[i].description}</li></p>
            <h2>CONTACT: </h2><p><li>${a[i].contact}</li></p>
            </div>
            </div>
            `
        }
    })
    
}

//CHAT WITH SELLER OPTION DISABLED
{/* <button class="h1-design collapse" id = ${a[i].userId} onclick = "gotoChat()">Chat with Seller</button> */}

function table() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById('mainDiv');
    tr = table.getElementsByTagName("div");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("li")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        //   document.getElementById("notFound").style.display = "none"
        } else{
            tr[i].style.display = "none"
            // document.getElementById("notFound").style.display = "block";
        }
      }       
    }
  }

function navbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




  function gotoChat(e){
      var buyerId = firebase.auth().currentUser.uid;
      var productId = e.getAttribute("id");
      sessionStorage.setItem("productId", productId)
      sessionStorage.setItem("buyerId", buyerId)
      window.location.assign("./chats.html");
  }
  function gotoMessage(){
    // var buyerId = firebase.auth().currentUser.uid;
    // sessionStorage.setItem("buyerId", buyerId);  
      window.location.assign("./chats.html").then(()=>{
          console.log(buyerId)
      })
  }