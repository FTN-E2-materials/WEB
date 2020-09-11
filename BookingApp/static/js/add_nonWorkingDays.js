Vue.component("add_nonWorkingDays", {
	
	
	data: function() {
		return {
            selectedDate:'',
            holidayName:'',
            ErrorMessage:''
		
		}
	
	},
	
    template: `
    <div class="profile-view-part">
    <div style="display:flex;margin-top:50px;margin-left:100px;">
    <p>Unesite ime praznika</p>
    <input type="text" style="margin-left:20px;" v-model="holidayName"/>
    </div>
    <div style="display:flex;margin-top:50px;margin-left:100px;">
    <p>Unesite datum</p>
    <input type="date" style="margin-left:60px;" v-model="selectedDate"/>
    </div>
    <p style="color:red;margin-left:170px;">{{ErrorMessage}}</p>
    <button class="save-button"  style="margin-left:190px;" type="button" v-on:click="Clicked"> Dodaj</button>
    </div>
	`,
	
	mounted ()  {
		
		
	},

	methods : {
        Clicked: function(){
            let flag=true;
            if(this.holidayName=='' || this.selectedDate=='')
            {
                flag=false;
                this.ErrorMessage="Morate popuniti sva polja.";
            }
            if(flag)
            {
                axios
                .put("/addDate",JSON.Stringify(this.selectedDate))
                .then(response => {
                    if(response.data!=null)
                    {
                        toast("Uspesno ste dodali datum");
                    }
                    else
                    {
                        toast("Doslo je do neke greske");
                    }
                })
            }
           
        }
	}
});