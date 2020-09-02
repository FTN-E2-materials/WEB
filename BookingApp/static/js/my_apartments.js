Vue.component("my_apartments", {
    data: function(){
        return {
            apartments:null,
            picture: ""
        }
    },

    template: `
    <div class="apartment-filter">
    <h1>Moji apartmani</h1>
    <div class="active-or-not">
        <button class="filter-aparments-btn">Aktivni apartmani</button>
        <button class="filter-aparments-btn">Neaktivni apartmani</button>
        <button class="filter-aparments-btn" v-on:click="addApartment"" >Dodaj novi apartman</button>
    </div>

    <div class="list-of-apartments">
        <div class = "apartment-row">
           
            <div class = "apartment-column-image">
                <h1 class="apartment-name">Apartman 1</h1>
                <div class = "image-apartment">
                    
                </div>
                <div class="more-buttons-ap">
                    <div class = "one-button-ap">
                        <div class = "icons">
                            <i class="material-icons">comments</i>
                        </div>
                        <a href = "apartment.html" class = "link">Komentari</a>
                    </div>
                    <div class = "one-button-ap">
                        <div class = "icons">
                            <i class="material-icons">information</i>
                        </div>
                        <a href = "apartment.html" class = "link">Pregledaj apartman</a>
                    </div>                            
                    <div class = "one-button-ap">
                        <div class = "icons">
                            <i class="material-icons">edit</i>
                        </div>
                        <a href = "apartment.html" class = "link">Promeni status</a>
                    </div>
                </div>

            </div>
           </div>
    </div>
</div>
     ` ,

    mounted () {
        
       
    },
    methods : {
        addApartment: function()
        {
            this.$router.push("/add_apartment");
        }
    }
});