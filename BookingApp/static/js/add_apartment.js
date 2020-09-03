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
            width:window.screen.availWidth/7
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
    <input type="number" class = "details" v-model="guestsNumber" v-on:change="signalChange">
    <p class = info-apt>Država</p>
    <input type="text"  class = "details" v-model="country" v-on:change="signalChange" >
    <p class = info-apt>Mesto</p>
    <input type="text" class = "details" v-model="state" v-on:change="signalChange">
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

<div class = "apt-stuff">
    <p class= "info-apt">Dodajte stvari koje se nalaze u apartmanu: </p>
    <input type="text" class="details">
</div>
<button class="submit" v-on:click="addApartment">Dodaj</button>

</div> 
</div>
</div>` ,

    mounted () {
        this.next = false;
        console.log(this.next);

    },
    methods : {
       NextButton : function()
       { 
           let flag=true;
           if( this.apartmentType==''||
           this.apartmentName=='' ||
           this.guestsNumber=='' ||
           this.country=='' ||
           this.state=='' ||
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
                this.imagesForBackend.push(e.target.result);
            }
            reader.readAsDataURL(file);
        },
        signalChange : function()
		{
			this.formErrorMessage='';
        },
        addApartment: function()
        {
            let apartmentParameters= {
                apartmentTitle:this.apartmentName,
                type:this.apartmentType,
                numberOfGuests:this.guestsNumber,
                numberOfRooms:this.numberOfRooms,
                comments:[],
                apartmentPictures:this.images,
              //  country:'',
               // state:'',
               location:null,
                costForNight:this.price,
                costCurrency:this.currency,
                comments:[],
                active:'inactive',
                checkInTime:this.applicationTime,
                checkOutTime:this.checkOutTime,
            
            };

            axios
			        .put('/apartments/addApartment', JSON.stringify(apartmentParameters))
			        .then(response => {
			        	  window.location.href = "#/";
			        	  
			          });

        }
    }
});