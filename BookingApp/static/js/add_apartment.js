// credt: https://github.com/stojanovic

function cyrilicToLatinic(string) {
    var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
    var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')

    return string.split('').map(function(char) {
      var index = cyrillic.indexOf(char)
      if (!~index)
        return char
      return latin[index]
    }).join('')
  }

Vue.component("add_apartment", {
    data: function(){
        return {
            apartmentName:'',
            apartmentType:'',
            guestsNumber:'',
            numberOfRooms:'',
            country:'',
            state:'',
            price:'',
            currency:'',
            applicationTime:'',
            checkOutTime:'',
            next:false,
            imageCount : 0,
            images: [],
            formErrorMessage:'',
            imagesForBackend: [],
            imageSize: '30%',
            width:window.screen.availWidth/9,
            places : null,
            amenities : null,
            city : "",
            zipcode : "", 
            longitude : "",
            latitude : "",
            street : "",
            number : "",
            address : "",
            selectedAmenity : [],			
            disabledDates: {
		          to: new Date(Date.now() - 8640000)
	        },
	        currentlyAdded : "",
	        startDate : "",
	        endDate : "",
	        errorName : "",
	        errorType : "",
	        errorStartDate : "",
	        errorEndDate : "",
	        errorCheckIn : "",
	        errorCheckOut : "",
	        errorCurrency : "",
	        errorCost : "",
	        errorGuests : "",
	        errorRooms : "",
	        errorAddress : "",
	        commentsEnabled : false
        }
    },

    template: `
       
<div class="form-part-add">
<h2>Dodajte novi apartman</h2>
        <table align="left" width="1000px">
    		<tr style="margin-left:5px;">
				<td v-for="(url, index) in images" :width="width"  style="vertical-align: middle; text-align: center;">
    			<div style="display:block; align-items:center;">
                    <button @click="deleteImage(index)" class = "button-x"> <i class="material-icons">close</i> </button>
					<img :src="url" :width="width" />
					
				</div>
				</td>
    		</tr>
    	</table>
    
            <table class="input-table" align="left" style="margin-left: 50px;">
                <tr><td>Naziv apartmana:</td>
                <td><input type="text" class="input-apt" v-model="apartmentName" v-on:change="signalChange"></td> 
                <td style="color:red;">{{errorName}}</td>
                </tr>
                <tr><td>Tip apartmana: </td>
                <td><input type="radio"  name="apartmentType" v-on:change="signalChange" value="soba" v-model="apartmentType">Soba 
                <input type="radio" name="apartmentType" v-on:change="signalChange" value="apartman" v-model="apartmentType">Ceo apartman</td>
                <td style="color:red;">{{errorType}}</td>
                </tr>
                <tr><td>Broj gostiju: </td>
                <td><input type="number" class="input-apt" min="1" value="1" v-model="guestsNumber">
                </td>
                <td style="color:red;">{{errorGuests}}</td>
                </tr>
                <tr><td>Broj soba: </td>
                <td ><input type="number" class="input-apt"  min="1" value="1" v-model="numberOfRooms" ></td>
                <td style="color:red;">{{errorRooms}}</td>
                </tr>
                <tr><td>Adresa apartmana: </td>
                <td><input type="search" id="address" v-on:change="signalChange"></td>
                <td style="color:red;">{{errorAddress}}</td>
                </tr>
                <tr><td>Grad: </td>
                <td><input type="text" id="city" class="input-apt" disabled></td>
               </tr>
                <tr><td>Država: </td>
                <td><input type="text" id="country" class="input-apt" disabled></td>
                </tr>
                <tr><td>Početni datum za izdavanje: </td>
                <td><vuejs-datepicker name="startDate" width="250px" class="input-apt" type="date" v-model="startDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker></td>
                <td style="color:red;">{{errorStartDate}}</td>
                </tr>
                <tr><td>Krajnji datum za izdavanje: </td>
                <td><vuejs-datepicker name="endDate" width="250px" class="input-apt" type="date" v-model="endDate" :disabledDates="disabledDates" format="dd.MM.yyyy."></vuejs-datepicker></td>
                <td style="color:red;">{{errorEndDate}}</td>
                </tr>
                <tr><td>Vreme prijave: </td>
                <td><input type="time" id="startTime" v-model="applicationTime" class="input-apt" v-on:change="signalChange"></td>
                <td style="color:red;">{{errorCheckIn}}</td>
                </tr>
                <tr><td>Vreme odjave: </td>
                <td><input type="time" id="endTime" v-model="checkOutTime" class="input-apt" v-on:change="signalChange"></td>
                <td style="color:red;">{{errorCheckOut}}</td>
                </tr>
                <tr><td>Cena za jednu noć: </td>
                <td><input type="number" min="1" v-model="price" class="input-apt" v-on:change="signalChange"></td>
                <td style="color:red;">{{errorCost}}</td>
                </tr>
                <tr><td>Valuta:</td> 
                <td><input type="radio" v-on:change="signalChange" name="valuta" value="RSD" v-model="currency">RSD
                <input type="radio" v-on:change="signalChange" name="valuta" value="Euro" v-model="currency">Euro
                <input type="radio" v-on:change="signalChange" name="valuta" value="Dolar" v-model="currency">Američki dolar

                </td>
                <td style="color:red;">{{errorCurrency}}</td>
                </tr>
                <tr><td>Označite slike apartmana:</td>
                <td><input v-if="imageCount < 5" type="file" @change="imageAdded" />
                 <input v-else type="file" @change="imageAdded" disabled="true"/></td>
                </tr>
                <tr><td>Trenutni sadržaj apartmana: </td><td> </td><td></td></tr>
    			<tr  v-for="a in amenities">
    			<td></td>
		    	<div class = "check-boxes-amenity">
					<div class = "one-check-box">
						<input type="checkbox" @click="checkAmenity(a)">	
						<label class="amenity-label" for="a.amenityName"> {{a.amenityName}}</label><br>
					</div>
				</div>
    			</td>
    			</tr>
    			<tr> <td> Omogući komentare: <td> <td> <input type="checkbox"  @click="checkedComment" id = "commentsEnabled"> Da </td> </tr>
    			<tr><td colspan="2" align="center"> <button class="submit-add-apt" v-on:click="addApartment"> Dodaj </button></td> </tr>
            </table>
    <input id="latitude" hidden>
    <input id="longitude" hidden>
    <input id="zipCode" hidden>
    
        


</div>` ,


/*

<div v-bind:hidden="next==true">

<div class="form-apt">
    <div class="col-add">
    <p class = info-apt>Naziv</p>
    <input type="text" class = "details" >
    <p class = "info-apt">Tip apartmana</p>
    <div class = "col-type-radio">
        <div class = "col-date">
            <input type="radio" class = "radio-apt" name="sortbydate" v-on:change="signalChange" value="soba" v-model="apartmentType">
            <p class = "sortbydate-font">Soba</p>
        </div>
        <div class = "col-date">
            <input type="radio" class = "radio-apt" name="sortbydate" v-on:change="signalChange" value="apartman" v-model="apartmentType">
            <p class = "sortbydate-font">Ceo apartman</p>
        </div>
    </div>
    <p class = info-apt>Broj gostiju</p>
    <input type="number" class = "details" min="1" value="1" v-model="guestsNumber" >
    <p class = info-apt>Adresa</p>
    <input type="search" id="address" v-on:change="signalChange">
    <p class = info-apt>Država</p>
    <input type="text"  class = "details" id="country" disabled v-on:change="signalChange" >
    </div>
    <div class="col-add">
    <p class = info-apt>Broj soba</p>
    <input type="number" value="1" class = "details" v-model="numberOfRooms" min="1" v-on:change="signalChange">
    <p class = info-apt>Cena</p>
    <input type="text" class = "details" v-model="price" v-on:change="signalChange">
    <p class = "info-apt">Valuta</p>
    <div class = "col-type-radio">
        <div class = "col-date">
            <input type="radio" class = "radio-apt" v-on:change="signalChange" name="valuta" value="RSD" v-model="currency">
            <p class = "sortbydate-font">RSD</p>
        </div>
        <div class = "col-date">
            <input type="radio" class = "radio-apt" v-on:change="signalChange" name="valuta" value="EURO" v-model="currency">
            <p class = "sortbydate-font">EUR</p>
        </div>
    </div>            

    <p class = "info-apt">Vreme prijave</p>
    <input type="time" class = "details" v-model="applicationTime" v-on:change="signalChange">
    <p class = "info-apt">Vreme odjave</p>
    <input type="time" class = "details" v-model="checkOutTime" v-on:change="signalChange">
    </div>
    
</div>
<p class="errorMessage">{{formErrorMessage}}</p>
<button type="button" class="submit-apt" v-on:click="NextButton" >Dalje</button> 
</div>
<div v-bind:hidden="next==false">
<button type="button" class="save-button" v-on:click="BackButton">Nazad</button> 
<div class="form-part-pics">
<div class="apt-stuff">
    <p class="info-apt">Označite fotografije apartmana:</p>
    <input v-if="numOfImages < 5" type="file" @change="imageAdded" />
        <input v-else type="file" @change="imageAdded" disabled="true"/>
 </div>
 
    <table>
        <tr style="margin-left:5px;">
            <td v-for="(url, index) in images"  >
                <img :src="url" :width="width" v-on:click="deleteImage(index)" />
            </td>
        </tr>
    </table>
    <input id="latitude" hidden>
    <input id="longitude" hidden>
    <input id="city" hidden>
    <input id="zipCode" hidden>
    

<div class = "apt-stuff">
    <p class= "info-apt">Dodaci u apartmanu: </p>
    	<div class = "check-boxes-amenity">
			<div class = "one-check-box" v-for="a in amenities">
				<input type="checkbox" @click="checkAmenity(a)">
				<label"> {{a.amenityName}}</label><br>
			</div>
		</div>
</div>
<button class="submit-apt" v-on:click="addApartment">Dodaj</button>

</div> 
</div>*/
    mounted () {
    	

    	axios
    		.get("addApartment/canISee")
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
    	this.applicationTime = "14:00";
    	this.checkOutTime = "10:00";
        this.next = false;
        console.log(this.next);
        
        axios 
        	.get("/amenities")
        	.then(response => {
        		this.amenities = response.data
        	});
        
        this.places = places({
        	appId: 'plQ4P1ZY8JUZ',
        	apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
        	container: document.querySelector('#address'),
		    templates: {
			      value: function(suggestion) {
			        return suggestion.name;
			      }
			    }
			  }).configure({
			    type: 'address'
			 });

		this.places.on('change', function getLocationData(e) {
			
		    document.querySelector('#address').value = e.suggestion.value || '';
		    document.querySelector('#country').value = e.suggestion.country || '';
		    document.querySelector('#city').value = e.suggestion.city || '';
		    document.querySelector('#longitude').value = e.suggestion.latlng.lng || '';
		    document.querySelector('#latitude').value = e.suggestion.latlng.lat || '';
		    document.querySelector('#zipCode').value = e.suggestion.postcode || '';
		    
		    
		  });
    },
    methods : {
    	checkedComment : function() {
    		this.commentsEnabled = !this.commentsEnabled;
    	},
    	checkAmenity : function(amenity) {
    		console.log("AAAAAAAAAAAAAAAAa00");
    		let flag = true;
    		for (a in this.selectedAmenity) {
    			if (this.selectedAmenity[a].id == amenity.id) {
    				flag = false;
    				this.selectedAmenity.splice(a, 1);
    				
    			}
    		}
    		console.log(amenity.id);
    		if (flag) {
    			this.selectedAmenity.push( {
    				name : amenity.amenityName,
    				id : amenity.id
    			});
    		}
    		
    		for (a of this.selectedAmenity) {
    			console.log(a.name);
    		}
    	},
       checkValidForm : function()
       { 
	       this.address = document.querySelector('#address').value;
	       this.country = document.querySelector('#country').value;
	       this.state = document.querySelector('#country').value;
		   this.zipCode = document.querySelector('#zipCode').value;
		   this.longitude = document.querySelector('#longitude').value;
		   this.latitude = document.querySelector('#latitude').value;
		   this.city = document.querySelector('#city').value;
           let flag=true;
           if (this.apartmentName=='') {
        	   this.errorName = "Ime apartmana je obavezno polje!";
        	   return false;
           }
           if( this.apartmentType=='') {
        	   this.errorType = "Tip apartmana je obavezno polje!";
        	   return false;
           }

           if (this.guestsNumber == '') {
        	   this.errorGuests = "Broj gostiju je obavezno polje!";
        	   return false;
           }
           
           if (this.numberOfRooms == '') {
        	   this.errorRooms = "Broj soba je obavezno polje!";
        	   return false;
           }
           
           if (this.address == '') {
        	   this.errorAddress = "Adresa je obavezno polje!";
        	   return false;
           }
           
           if (this.currency == '') {
        	   this.errorCurrency = "Valuta je obaveno polje!";
        	   return false;
           }
           
           if (this.price == '') {
        	   this.errorCost = "Cena je obavezno polje!";
        	   return false;
           }
           
           if (this.applicationTime == '') {
        	   this.errorCheckIn = "Vreme prijave je obavezno polje!"; 
        	   return false;
           }
           
           if (this.checkOutTime == '') {
        	   this.errorCheckOut = "Vreme odjave je obavezno polje!";
        	   return false;
           }  
           return true;
       },
       BackButton: function()
       {
           this.next=false;
       },
       deleteImage(index)
        {
        this.imageCount--;
        this.images.splice(index,1);
        this.imagesForBackend.splice(index,1);
        },
        imageAdded(e) 
        {
            const file = e.target.files[0];
            this.createBase64Image(file);
            this.imageCount++;
            this.images.push(URL.createObjectURL(file));
        },
        createBase64Image(file){
            const reader= new FileReader();
           
            reader.onload = (e) =>{
            	let img = e.target.result;
            	//img.replace("data:image\/(png|jpg|jpeg);base64", "");
                this.imagesForBackend.push(img);
            }
            reader.readAsDataURL(file);
        },
        signalChange : function()
		{
			this.formErrorMessage='';
        },
        addApartment: function()
        {
        	if (this.checkValidForm()) {
	        	this.address = cyrilicToLatinic(document.querySelector('#address').value);
	        	this.country = cyrilicToLatinic(document.querySelector('#country').value);
	        	this.state = cyrilicToLatinic(document.querySelector('#country').value);
			    this.zipCode = cyrilicToLatinic(document.querySelector('#zipCode').value);
			    this.longitude = cyrilicToLatinic(document.querySelector('#longitude').value);
			    this.latitude = cyrilicToLatinic(document.querySelector('#latitude').value);
			    
			    if (!cyrilicToLatinic(document.querySelector('#city').value)) {
			    	this.city="  ";
			    } else {
				    this.city = cyrilicToLatinic(document.querySelector('#city').value);			    	
			    }
			    
			    if (this.zipCode == "") {
			    	this.zipCode = 0;
			    }

			    let dateFrom = moment(this.startDate).format("YYYY-MM-DD");
			    let dateS = new Date(dateFrom);
			    
			    let dateTo = moment(this.endDate).format("YYYY-MM-DD");
			    let dateE = new Date(dateTo);
			    let period = {
			    		startDate : dateS,
			    		endDate : dateE
			    }
			    
			    
	        	let stateCurr = {
	        		state : this.state
	        	};
	        
	        	let cityCurr = {
	        		state : stateCurr,
	        		city : this.city,
	        		zipCode : this.zipCode
	        	};
	        
	        	let addressCurr = {
	        		city : cityCurr,
	        		address : this.address
	        	};
	        	
	        	let locationCurr = {
	        		latitude : this.latitude,
	        		longitude : this.longitude,
	        		address : addressCurr
	        	};
	        	
	        	if (this.currency === "RSD") {
	        		this.currency = "Dinar";
	        	} else if (this.currency === "Euro") {
	        		this.currency = "Euro";
	        	} else {
	        		this.currency = "Dollar";
	        	}
	        	let amenitiesToSend = [];
	        	for (amenity of this.selectedAmenity) {
	        		amenitiesToSend.push({
	        			amenityName : amenity.name,
	        			id : amenity.id,
	        			deleted : false
	        		});
	        		console.log(amenity.id);
	        	}
	        	for (i of this.imagesForBackend) {
	        		console.log(i);
	        	}
	        	console.log(this.commentsEnabled);
			    
	            let apartmentParameters= {
	                apartmentTitle:this.apartmentName,
	                type:this.apartmentType,
	                numberOfGuests:this.guestsNumber,
	                numberOfRooms:this.numberOfRooms,
	                comments:[],
	                apartmentPictures:this.imagesForBackend,
	              //  country:'',
	               // state:'',
	                location: locationCurr,
	                costForNight:this.price,
	                costCurrency:this.currency,
	                active: false,
	                checkInTime:this.applicationTime,
	                checkOutTime:this.checkOutTime,
	                amenities : amenitiesToSend,
	                commentsEnabled : this.commentsEnabled,	                
	                startDate : dateFrom,
	                endDate : dateTo
	                
	            
	            };
	
	            axios
					.post('/apartments/addApartment', JSON.stringify(apartmentParameters))
				    .then(response => {
				    	if (response.data != null && response.data != "") {
				    		toast("Uspesno ste dodali apartman!");
				    		window.location.href = "#/";
				    		
				    	} else if (response.status == 404) {
				    		toast("Došlo je do neke greške!");
				    	} else {
				    		toast("Došlo je do neke greške!");    		
				    	}
				     });
	            
        	}

        }
    }, 
	components : { 
		vuejsDatepicker
	}
});