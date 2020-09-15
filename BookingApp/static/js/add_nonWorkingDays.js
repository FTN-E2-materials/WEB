Vue.component("add_nonWorkingDays", {
	
	
	data: function() {
		return {
            selectedDate:'',
            holidayName:'',
            ErrorMessage:'',
            holidays : [],
            addMode : true,
            editMode : false,
            deleteMode : false,
            id : 0
		}
	
	},
	
    template: `
    <div class="profile-view-part">
    <table style="margin-left:100px;margin-top:50px;">
    <tr v-for = "h in holidays">
    	<td>{{h.holidayName}}</td> <td> <td>{{getDate(h)}}</td><td> <a href="#/add_nonWorkingDays" @click="editHoliday(h)">Izmeni</a> </td> <td> <a href="#/add_nonWorkingDays" @click="deleteHoliday(h)">Obriši</a></td>
    </tr>
    </table>
    <div style="display:flex;margin-top:50px;margin-left:100px;">
    <p>Unesite ime praznika</p>
    <input type="text" style="margin-left:20px;" v-model="holidayName"/>
    </div>
    <div style="display:flex;margin-top:50px;margin-left:100px;">
    <p>Unesite datum</p>
    <input type="date" style="margin-left:60px;" v-model="selectedDate"/>
    </div>
    <p style="color:red;margin-left:170px;">{{ErrorMessage}}</p>
    <div v-bind:hidden="addMode==false">
    	<button style="margin-top:50px;" class="save-button"  style="margin-left:190px;" type="button" v-on:click="Clicked"> Dodaj</button>
    </div>
    <div v-bind:hidden="editMode==false">
    	<div style="display:flex; margin-top:50px;margin-left:100px;">
    		<button class="save-button"  style="margin-left:190px;" type="button" v-on:click="Cancel"> Otkaži</button>
    		<button class="save-button"  style="margin-left:190px;" type="button" v-on:click="Edit"> Izmeni</button>
    	</div>
    </div>
    
        <div v-bind:hidden="deleteMode==false">
    	<div style="display:flex; margin-top:50px;margin-left:100px;">
    		<button class="save-button"  style="margin-left:190px;" type="button" v-on:click="Cancel"> Otkaži</button>
    		<button class="save-button"  style="margin-left:190px;" type="button" v-on:click="Delete"> Obriši</button>
    	</div>
    </div>
    
    </div>
	`,
	
	mounted ()  {

    	axios
    		.get("holidays/canISee")
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
			.get("holiday/getAll")
			.then(response => {
				if (response.data != null) {
					this.holidays = response.data;
					this.addMode = true;
					this.editMode = false;
					this.deleteMode = false;
				}
			})
		
	},

	methods : {
		getDate : function(holiday){
			return moment(holiday.date).format("DD.MM.YYYY.");
		},
        Clicked: function(){
            let flag=true;
            if(this.holidayName=='' || this.selectedDate=='')
            {
                flag=false;
                this.ErrorMessage="Morate popuniti sva polja.";
            }
            if(flag)
            {
		    	let date = moment(this.selectedDate).format("YYYY-MM-DD");
		    	let dateToSend = new Date(date);
            	let parameters = {
            			holidayName : this.holidayName,
            			date : dateToSend
            	}
                axios
                .put("holiday/addHoliday",JSON.stringify(parameters))
                .then(response => {
                    if(response.data!=null)
                    {
                        toast("Uspesno ste dodali datum");

            			axios 
            			.get("holiday/getAll")
            			.then(response => {
            				if (response.data != null) {
            					this.holidays = response.data;
            					this.addMode = true;
            					this.editMode = false;
            					this.deleteMode = false;
            					toast("Uspešno ste izmenili praznik");
            				} else {
            					toast("Došlo je do neke greške!");
            				}
            			})
                    }
                    else
                    {
                        toast("Doslo je do neke greske");
                    }
                })
            }
           
        }, 
        editHoliday : function(holiday) {
        	this.addMode = false;
        	this.editMode= true;
        	this.deleteMode = false;
        	this.holidayName = holiday.holidayName;
        	this.selectedDate = moment(holiday.date).format("DD.MM.YYYY.");
        	this.id = holiday.id;
        }, 
        deleteHoliday : function(holiday) {
        	this.addMode = false;
        	this.editMode= false;
        	this.deleteMode = true;
        	this.holidayName = holiday.holidayName;
        	this.selectedDate = moment(holiday.date).format("DD.MM.YYYY.");
        	this.id = holiday.id;
        	console.log(holiday.id);
        },
        Edit : function() {
	    	let date = moment(this.selectedDate).format("YYYY-MM-DD");
	    	let dateToSend = new Date(date);
        	let parameters = {
        			holidayName : this.holidayName,
        			date : dateToSend, 
        			id : this.id
        	}
        	
        	axios 
        		.post("holiday/updateHoliday", JSON.stringify(parameters))
        		.then(response => {
        			axios 
        			.get("holiday/getAll")
        			.then(response => {
        				if (response.data != null) {
        					this.holidays = response.data;
        					this.addMode = true;
        					this.editMode = false;
        					this.deleteMode = false;
        					toast("Uspešno ste izmenili praznik");
        		        	this.holidayName = "";
        		        	this.selectedDate = "";
        				} else {
        					toast("Došlo je do neke greške!");
        				}
        			})
        		})
        },
        Delete : function() {
	    	let date = moment(this.selectedDate).format("YYYY-MM-DD");
	    	let dateToSend = new Date(date);
	    	console.log(this.id);
        	let parameters = {
        			holidayName : this.holidayName,
        			date : dateToSend, 
        			id : this.id
        	}
        	
        	axios 
        		.delete("holiday/deleteHoliday/" + this.id)
        		.then(response => {
        			axios 
        			.get("holiday/getAll")
        			.then(response => {
        				if (response.data != null) {
        					this.holidays = response.data;
        					this.addMode = true;
        					this.editMode = false;
        					this.deleteMode = false;
        					toast("Uspešno ste obrisali praznik");
        		        	this.holidayName = "";
        		        	this.selectedDate = "";
        				} else {
        					toast("Došlo je do neke greške!");
        				}
        			})
        		});
        },
        Cancel : function() {
        	this.addMode = true;
        	this.editMode= false;
        	this.deleteMode = false;
        	this.holidayName = "";
        	this.selectedDate = "";
        }
	}
});