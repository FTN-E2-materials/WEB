Vue.component("users_preview" , {
    data: function(){
        return{
            users : null,
            gender:'',
            searchMode:false,
            searchInput:'',
            searchResult:'',
            searchedUsers:[]
        }
        
    },

    template:`
    <div class="profile-view-part2">
    <h2>Pregled korisnika</h2>
    <input type="search" placeholder="Pretraži..." style="margin-left:700px;" v-on:input="searchActive(this.value)" v-on:blur="searchUnactive" v-model="searchInput" />
    <div    v-bind:hidden="searchMode!=false">
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

   <div    v-bind:hidden="searchMode!=true">
   <div v-if="searchedUsers.length==0">
   <label style="margin-left:400px;margin-top:200px;">Nema rezultata pretrage</label>
   </div>
   <div v-else>
   <div class = "row-reservations" v-for = "user in searchedUsers">
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
       searchActive: function(){
           this.searchMode=true;
           this.searchedUsers=[];
           for (var i = 0, len = this.users.length; i < len; i++) {
            if(this.users[i].name.toLowerCase().includes(this.searchInput.toLowerCase()))
            {
               if(this.searchedUsers.indexOf(this.users[i])==-1)
               {
                this.searchedUsers.push(this.users[i]);
               }
                    
                
            }
            if(this.users[i].surname.toLowerCase().includes(this.searchInput.toLowerCase()) ==true) {
                if(this.searchedUsers.indexOf(this.users[i])==-1)
                    {
                        this.searchedUsers.push(this.users[i]);
                    }
                     
              }
              if(this.users[i].username.toLowerCase().includes(this.searchInput.toLowerCase())==true) {
                if(this.searchedUsers.indexOf(this.users[i])==-1)
                    {
                    this.searchedUsers.push(this.users[i]);
                    }
                   
                }
                let gender='';
                if(this.users[i].gender=='Female')
                {
                    gender="zensko";
                }
                if(this.users[i].gender=='Male')
                {
                    gender="musko";
                }
                if(this.users[i].gender=='Other')
                {
                    gender="ostalo";
                }
                if(gender.toLowerCase().includes(this.searchInput.toLowerCase())==true) {
                    if(this.searchedUsers.indexOf(this.users[i])==-1)
                    {
                        this.searchedUsers.push(this.users[i]);
                    }
                }
            }
            
           
          
            
          
        
           
       },
       searchUnactive: function(){
        this.searchMode=false;
    }
    
}});