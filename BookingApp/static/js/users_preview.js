Vue.component("users_preview" , {
    data: function(){
        return{
            users : null,
            gender:'',
            searchMode:false,
            searchInput:'',
            searchResult:'',
            searchedUsers:[],
            canBlock : false,
            genderFilter:'All',
            roleFilter:'All',
            filteredUsers:[]
        }
        
    },

    template:`
    <div class="profile-view-part2">
    <h2>Pregled korisnika</h2>
    <div style="display:flex;">
    div v-bind:hidden="canBlock==false">
    <select style="margin-left:300px;border:none;" v-on:change="FilterChanged" id="roleFilter" >
    <option value="All" >Svi tipovi korisnika</option>
    <option value="Administrator" >Admini</option>
    <option value="Guest">Gosti</option>
    <option value="Host">Domaćini</option>
    </select>
    </div>
    <select style="margin-left:30px;border:none;width:100px;" v-on:change="FilterChanged()" id="genderFilter" >
    <option value="All" >Svi polovi</option>
    <option value="Male">Muško</option>
    <option value="Female">Žensko</option>
    <option value="Other">Ostalo</option>
    </select>
    <input type="search" placeholder="Pretraži..." style="margin-left:130px;" v-on:input="searchActive(this.value)" v-on:blur="searchUnactive" v-model="searchInput" />
    </div>
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

   <div v-bind:hidden="canBlock==false">
   <div v-if="user.role!='Administrator'">
   <div class = "username">
   <div v-if="user.blocked==false">
       <label class="username2" style="text-decoration:underline;" @click=" BlockUser(user)">Blokiraj korisnika</label>
    </div>
    <div v-else>
    <label class="username2" style="text-decoration:underline;" @click=" UnblockUser(user)">Odblokiraj korisnika</label>
    </div>
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
  
  <div v-bind:hidden="canBlock==false">
	  <div v-if="user.role!='Administrator'">
		   <div class = "username">
			   <div v-if="user.blocked==false">
			       <label class="username2" style="text-decoration:underline;" @click=" BlockUser(user)">Blokiraj korisnika</label>
			    </div>
		    	<div v-else>
		    		<label class="username2" style="text-decoration:underline;" @click=" UnblockUser(user)">Odblokiraj korisnika</label>
		    	</div>
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
    		.get("userPreview/canISee")
    		.then(response => {
    			if (response.status == 403) {
    				window.location.href = "#/forbidden";
    			}
    		})
    		.catch(function(error) {
    			if (error.response.status == 403) {
    				window.location.href = "#/forbidden";
    			}
    		});
    	axios 
    		.get("user/seeIfLogged") 
    		.then(response => {
    			if (response.data.role == 'Administrator') {
    		        axios
    		        .get("user/getAll")
    		        .then(response => {
    		            if (response.data == null) {
    		                this.canBlock = false;
                            this.users=null;
                            this.filteredUsers=null;
    		            }
    		            else {
                            this.users = response.data;
                            this.filteredUsers = response.data;
            
    		                this.canBlock = true;
    		            }
    		        })
    			} else if (response.data.role == 'Host') {
    		        axios
    		        .get("apartment/getUserPreviewForHost")
    		        .then(response => {
    		            if (response.data == null) {
    		                this.canBlock = false;
                            this.users=null;
                            this.filteredUsers=null;
    		            }
    		            else {
                            this.users = response.data;
                            this.filteredUsers = response.data;
    		                this.canBlock = false;
    		            }
    		        })
    				
    			} else {
    				window.location.href = "#/";
    				this.canBlock = false;
    			}
    		});

    },
    methods : {
       searchActive: function(){
           this.searchMode=true;
           this.searchedUsers=[];
           for (var i = 0, len = this.filteredUsers.length; i < len; i++) {
            if(this.filteredUsers[i].name.toLowerCase().includes(this.searchInput.toLowerCase()))
            {
               if(this.searchedUsers.indexOf(this.filteredUsers[i])==-1)
               {
                this.searchedUsers.push(this.filteredUsers[i]);
               }
                    
                
            }
            if(this.filteredUsers[i].surname.toLowerCase().includes(this.searchInput.toLowerCase()) ==true) {
                if(this.searchedUsers.indexOf(this.filteredUsers[i])==-1)
                    {
                        this.searchedUsers.push(this.filteredUsers[i]);
                    }
                     
              }
              if(this.filteredUsers[i].username.toLowerCase().includes(this.searchInput.toLowerCase())==true) {
                if(this.searchedUsers.indexOf(this.filteredUsers[i])==-1)
                    {
                    this.searchedUsers.push(this.filteredUsers[i]);
                    }
                   
                }
            
            }
            
           
          
            
          
        
           
       },
       searchUnactive: function(){
        this.searchMode=false;
    },
        BlockUser:function(u){
            axios 
				.post("/user/blockUser/" + u.username)
				.then(response => {
					if (response.data == null) {
						console.log("Ne valja");
					}
					else {
						this.users = response.data;
					}
					
				});
        },
        UnblockUser:function(u){
            axios 
				.post("/user/unblockUser/" + u.username)
				.then(response => {
					if (response.data == null) {
						console.log("Ne valja");
					}
					else {
						this.users = response.data;
					}
					
				});
        },
        FilterChanged:function(v){
            this.searchMode=true;
           this.filteredUsers=[]; 
            var role=document.getElementById("roleFilter");
            this.roleFilter=role.options[role.selectedIndex].value;
            console.log(this.roleFilter);
           

            var gender=document.getElementById("genderFilter");
            this.genderFilter=gender.options[gender.selectedIndex].value;
            console.log(this.genderFilter);
         

           
                
                if(this.roleFilter!="All" && this.genderFilter!="All")
                {   
                    
                for (var i = 0, len = this.users.length; i < len; i++) {
                    if(this.users[i].role==this.roleFilter && this.users[i].gender==this.genderFilter) {
                        
                            this.filteredUsers.push(this.users[i]);
                    }
                }

                }

                if(this.roleFilter=="All" && this.genderFilter!="All")
                {   
                    
                for (var i = 0, len = this.users.length; i < len; i++) {
                    if(this.users[i].gender==this.genderFilter) {
                        
                            this.filteredUsers.push(this.users[i]);
                    }
                }
                
                }

                if(this.roleFilter!="All" && this.genderFilter=="All")
                {   
                    
                for (var i = 0, len = this.users.length; i < len; i++) {
                    if(this.users[i].role==this.roleFilter) {
                        
                            this.filteredUsers.push(this.users[i]);
                    }
                }

                }

                if(this.roleFilter=="All" && this.genderFilter=="All")
                {   
                    
                for (var i = 0, len = this.users.length; i < len; i++) {
                      
                            this.filteredUsers.push(this.users[i]);
                    

                }
                }
        this.searchedUsers=this.filteredUsers;
}}

    
});