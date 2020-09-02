Vue.component("add_apartment", {
    data: function(){
        return {
            
        }
    },

    template: `<div class="form-part">
    <h1>Dodajte novi apartman</h1>
    <div class="form-apt">
        <div class="col-add">
        <p class = info-apt>Naziv</p>
        <input type="text" id="apt-name" class = "details">
        <p class = "info-apt">Tip apartmana</p>
        <div class = "col-type-radio">
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="sortbydate" value="Najnovije">
                <p class = "sortbydate-font">Soba</p>
            </div>
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="sortbydate" value="Najstarije">
                <p class = "sortbydate-font">Ceo apartman</p>
            </div>
        </div>
        <p class = info-apt>Broj gostiju</p>
        <input type="number" id="apt-num" class = "details">
        <p class = info-apt>Država</p>
        <input type="text" id="apt-num" class = "details">
        <p class = info-apt>Mesto</p>
        <input type="text" id="apt-num" class = "details">
        </div>
        <div class="col-add">
        <p class = info-apt>Cena</p>
        <input type="text" id="apt-name" class = "details">
        <p class = "info-apt">Valuta</p>
        <div class = "col-type-radio">
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="valuta" value="Najnovije">
                <p class = "sortbydate-font">RSD</p>
            </div>
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="valuta" value="Najstarije">
                <p class = "sortbydate-font">EUR</p>
            </div>
        </div>            
        <p class = "info-apt">Status</p>
        <div class = "col-type-radio">
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="status" value="Najnovije">
                <p class = "sortbydate-font">AKTIVAN</p>
            </div>
            <div class = "col-date">
                <input type="radio" id="type-apt" class = "radio-apt" name="status" value="Najstarije">
                <p class = "sortbydate-font">NEAKTIVAN</p>
            </div>
            
        </div>
        
            
        <p class = "info-apt">Vreme prijave</p>
        <input type="text" id="apt-num" class = "details">
        <p class = "info-apt">Vreme odjave</p>
        <input type="text" id="apt-num" class = "details">
        </div>
        
    
</div>
<button type="button" class="submit-apt" onclick="location.href='add_picture.html'">Dalje</button>
</div> ` ,

    mounted () {

    },
    methods : {
       
    }
});