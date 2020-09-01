Vue.component("users_preview" , {
    data: function(){
        return{
            users : null,
            gender:''
        }
        
    },

    template:`
    <div class="profile-view-part">
    <h2>Pregled korisnika</h2>
        <div class = "row-reservations" v-for = "user in users">
        <div class="row-reservations">
        <div class = "col-profile-pic">
               <div>
                   <img :src="user.profilePicture" class= "profile-image" alt = "Profile Image">
               </div>
           </div>
        <div class="col-informations">



   <div class = "username">
       <label class="username2">Ime:</label>
       <div class = "col-filters">
           <div class = "col-username2">
           <p>{{user.name}}</p>
           </div>
       </div>
      
   </div>
   <div class = "username">
       <label class="username2">Prezime:</label>
       <div class = "col-filters">
           <div class = "col-username2">
           <p >{{user.surname}}</p>
           </div>
       </div>
   </div>

   <div class = "username">
       <label class="username2">Korisničko ime:</label>
       <div class = "col-filters">
           <div class = "col-username2">
               <p >{{user.username}}</p>
           </div>
       </div>
   </div>

   <div class = "username">
       <label class="username2">Pol:</label>
       <div class = "col-filters">
           <div class = "col-username2">
               <p v-if="user.gender=='Female'">Žensko</p>
               <p v-if="user.gender=='Male'">Muško</p>
               <p v-if="user.gender=='Other'">Ostalo</p>
           </div>
        </div>
   </div>

   </div>
   </div>
   </div>
   </div>
`,
    mounted () {
        axios
        .get("user/getAll")
        .then(response => {
            if (response.data == null) {
                this.users=null;
            }
            else {
                this.users = response.data;
            }
        })

    },
    methods : {
       
    }
});