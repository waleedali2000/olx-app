var firebaseConfig = {
    apiKey: "AIzaSyBgpefNoyUFGYcui97g7ANnyqA_uxLH270",
    authDomain: "olxweb-707b9.firebaseapp.com",
    databaseURL: "https://olxweb-707b9.firebaseio.com",
    projectId: "olxweb-707b9",
    storageBucket: "olxweb-707b9.appspot.com",
    messagingSenderId: "602300384221",
    appId: "1:602300384221:web:c009851bbd96fa52e46c34",
    measurementId: "G-EZ1FMV703R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
    function Login(){
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      document.getElementById("loginLoader").style.display = "block";
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(success){  
      document.getElementById("loginLoader").style.display = "none";
      localStorage.setItem("currentUserKey",firebase.auth().currentUser.uid)
          swal("Logged In!", "Welcome!", "success").then(()=>{
            window.location.replace("./mainPage.html")
          })
        })
      .catch(function(error) {
      document.getElementById("loginLoader").style.display = "none";
          var errorMessage = error.message;
          swal(errorMessage, "Please! Resolve it.", "error")         
        });
    }
    
    function SignUp(){
        var name = document.getElementById("signupName").value;
        var email = document.getElementById("signupEmail").value;
        var password = document.getElementById("signupPass").value;
        var file = document.getElementById("image").files[0];
        document.getElementById("creatingLoader").style.display = "block"      
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(success){
          var storageRef = firebase.storage().ref().child(`Profile Picture/${file.name}`)
          var userId = firebase.auth().currentUser.uid
            var userData = {
                name,
                email,
                userId
            }
          storageRef.put(file).then((url)=>{
            url.ref.getDownloadURL().then((refUrl)=>{
            userData.profilePic = refUrl
            firebase.database().ref('USERS/' + userId).set(userData)
              console.log(userData);
            })
          })
            .then((success)=>{
            console.log(success)
           document.getElementById("creatingLoader").style.display = "none"     
            swal("You Account has been Created!", "Welcome!", "success").then(()=>{
              window.location.replace("./mainPage.html")
            })
            })
        })
        .catch(function(error) {
          document.getElementById("creatingLoader").style.display = "none"      
            var errorMessage = error.message;
            swal(errorMessage, "Please! Resolve it.", "error")         
          });
      }
      
    



    function logout(){
      firebase.auth().signOut().then(function() {
        window.location.replace("./index.html")
      }).catch(function(error) {
        console.log(error.message)
      });
    }

    function logout2(){
      firebase.auth().signOut().then(function() {
        window.location.replace("../index.html")
      }).catch(function(error) {
        console.log(error.message)
      });
    }