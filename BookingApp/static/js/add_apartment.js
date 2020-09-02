Vue.component("add_apartment", {
    data: function(){
        return {
            apartmentName:'',
            apartmentType:'',
            guestsNumber:'',
            country:'',
            state:'',
            price:'',
            currency:'',
            applicationTime:'',
            checkOutTime:'',
            next:false
        }
    },

    template: `
    <div class="form-part" v-bind:hidden="next==true">
    <h2>Dodajte novi apartman</h2>
    <div v-bind:hidden="next==true">
    <div class="form-apt">
        <div class="col-add">
        <p class = info-apt>Naziv</p>
        <input type="text" id="apt-name" class = "details" v-model="apartmentName">
        <p class = "info-apt">Tip apartmana</p>
        <div class = "col-type-radio">
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="sortbydate" value="Najnovije" v-model="apartmentType">
                <p class = "sortbydate-font">Soba</p>
            </div>
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="sortbydate" value="Najstarije" v-model="apartmentType">
                <p class = "sortbydate-font">Ceo apartman</p>
            </div>
        </div>
        <p class = info-apt>Broj gostiju</p>
        <input type="number" id="apt-num" class = "details" v-model="guestsNumber">
        <p class = info-apt>Država</p>
        <input type="text" id="apt-num" class = "details" v-model="country" >
        <p class = info-apt>Mesto</p>
        <input type="text" id="apt-num" class = "details" v-model="state">
        </div>
        <div class="col-add">
        <p class = info-apt>Cena</p>
        <input type="text" id="apt-name" class = "details" v-model="price">
        <p class = "info-apt">Valuta</p>
        <div class = "col-type-radio">
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="valuta" value="Najnovije" v-model="currency">
                <p class = "sortbydate-font">RSD</p>
            </div>
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="valuta" value="Najstarije" v-model="currency">
                <p class = "sortbydate-font">EUR</p>
            </div>
        </div>            
    
        <p class = "info-apt">Vreme prijave</p>
        <input type="text" id="apt-num" class = "details" v-model="applicationTime">
        <p class = "info-apt">Vreme odjave</p>
        <input type="text" id="apt-num" class = "details" v-model="checkOutTime">
        </div>
        <button type="button" class="submit-apt" v-on:click="NextButton">Dalje</button> 
    </div>
    </div>

    <div v-bind:hidden="next==true">
    <div class="form-part-pics">
    <div class="apt-images">
        <p class="info-apt">Oznacite fotografije apartmana:</p>
        <input type="file" class="details">
    </div>
    <div class = "apt-stuff">
        <p class= "info-apt">Dodajte stvari koje se nalaze u apartmanu: </p>
        <input type="text" class="details">
        <button class="submit">Dodaj</button>
    </div>
    </div>
    </div>
</div> ` ,

    mounted () {

    },
    methods : {
       NextButton : function()
       {
           this.next=true;
       }
    }
});