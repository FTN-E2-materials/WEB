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
            numOfImages : 0,
            images: [],
            formErrorMessage:'',
            imagesForBackend: [],
            imageSize: '40%',
            width:window.screen.availWidth/7,
            places : null,
            amenities : null,
            city : "",
            zipcode : "", 
            longitude : "",
            latitude : "",
            street : "",
            number : "",
            address : "",
            selectedAmenity : []
        }
    },

    template: `
       
<div class="form-part" >
<h2>Dodajte novi apartman</h2>
<div v-bind:hidden="next==true">
<div class="form-apt">
    <div class="col-add">
    <p class = info-apt>Naziv</p>
    <input type="text" class = "details" v-model="apartmentName" v-on:change="signalChange">
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
    <input type="number" class = "details" v-model="guestsNumber" >
    <p class = info-apt>Adresa</p>
    <input type="search" id="address" v-on:change="signalChange">
    <p class = info-apt>Država</p>
    <input type="text"  class = "details" id="country" disabled v-on:change="signalChange" >
    </div>
    <div class="col-add">
    <p class = info-apt>Broj soba</p>
    <input type="number" class = "details" v-model="numberOfRooms" v-on:change="signalChange">
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
    <input type="text" class = "details" v-model="applicationTime" v-on:change="signalChange">
    <p class = "info-apt">Vreme odjave</p>
    <input type="text" class = "details" v-model="checkOutTime" v-on:change="signalChange">
    </div>
    
</div>
<p class="errorMessage">{{formErrorMessage}}</p>
<button type="button" class="submit-apt" v-on:click="NextButton" >Dalje</button> 
</div>
<div v-bind:hidden="next==false">
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
    <p class= "info-apt">Dodajte stvari koje se nalaze u apartmanu: </p>
    	<div class = "check-boxes-amenity">
			<div class = "one-check-box" v-for="a in amenities">
				<input type="checkbox" v-model="selectedAmenity"  id="a.amenityName" name="a.amenityName" :value="a.amenityName">
				<label for="vehicle2"> {{a.amenityName}}</label><br>
			</div>
		</div>
</div>
<button class="submit" v-on:click="addApartment">Dodaj</button>

</div> 
</div>
</div>` ,

    mounted () {
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
		    
		    
		    console.log(this.address);
		  });
    },
    methods : {
       NextButton : function()
       { 
	       	this.address = document.querySelector('#address').value;
	    	this.country = document.querySelector('#country').value;
	    	this.state = document.querySelector('#country').value;
		    this.zipCode = document.querySelector('#zipCode').value;
		    this.longitude = document.querySelector('#longitude').value;
		    this.latitude = document.querySelector('#latitude').value;
		    this.city = document.querySelector('#city').value;
           let flag=true;
           if( this.apartmentType==''||
           this.apartmentName=='' ||
           this.guestsNumber=='' ||
           this.country=='' ||
           this.address=='' ||
           this.price=='' ||
           this.currency=='' ||
           this.applicationTime==''||
           this.checkOutTime=='')
           {
               flag=false;
               this.formErrorMessage="Morate popuniti sva polja u formi.";
               console.log(this.currency);
           }
           if(flag)
           {
                this.next=true;
           }
           
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
            	img.replace("data:image\/(png|jpg|jpeg);base64", "");
            	console.log(img);
                this.imagesForBackend.push(img);
            }
            reader.readAsDataURL(file);
        },
        signalChange : function()
		{
			this.formErrorMessage='';
		    console.log(this.address);
        },
        addApartment: function()
        {
        	this.address = document.querySelector('#address').value;
        	this.country = document.querySelector('#country').value;
        	this.state = document.querySelector('#country').value;
		    this.zipCode = document.querySelector('#zipCode').value;
		    this.longitude = document.querySelector('#longitude').value;
		    this.latitude = document.querySelector('#latitude').value;
		    this.city = document.querySelector('#city').value;
        	
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
        	} else if (this.currency === "EURO") {
        		this.currency = "Euro";
        	} else {
        		this.currency = "Dollar";
        	}
        	let amenitiesToSend = [];
        	for (amenity of this.selectedAmenity) {
        		amenitiesToSend.push({
        			amenityName : amenity
        		});
        	}
        	for (i of this.imagesForBackend) {
        		console.log(i);
        	}
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
                amenities : amenitiesToSend
            
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
});