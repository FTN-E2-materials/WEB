Vue.component("homepage", {
	data: function() {
		return {
			destinations : [],
			numOfRows : "",
			numOfEl : ""
		}
	}, 
	
	template : `
    <div class = dest-section>
        <div class = "destinations-show">
            <h1>Najtraženije destinacije</h1>
            <div class = "img-row" v-for="i in destinations">
	            <div class="img">
	                <h1 class="description">{{i.name}}</h1>
	                <img :src="i.imagePath" class= "spain" v-on:click="showApartments(i.name)">
	            </div>
	        </div>
        </div>
    </div>
	`,
	mounted () {
		axios
			.get("apartment/getMostPopularDestinations")
			.then(response => {
				this.destinations = response.data;
				this.numOfRows = response.data.length / 3 + 1;
				if (this.destinations.length < 3) {
					this.numOfEl = this.destinations.length;
				}
				console.log(this.destinations.length);
			});
	}, 
	methods : {
		showApartments : function(destination) {
		      this.$root.$refs.apartments_component.showDestinations(destination);
		}
	}
});