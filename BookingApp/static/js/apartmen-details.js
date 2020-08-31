Vue.component("apartment-details", {
	data: function() {
		return {
			apartment: null,
			picture: "",
			rowNum: "",
			picNum: "",
			checkInTime: "",
			checkOutTime: "",
			numOfGuests: "",
			titleOfApartment: "",
			numOfRooms: "",
			host: "",
			apartmentDesc: "",
			costForNight: ""
		}
	},
	template: `
		
    <div class = "reservations-details">
        <div class = "apartment-details">
            <div class = "image-column">
                <div>
                	<img :src="picture" class = "image-source" alt = "Glavna slika">
                </div>
            </div>
            <div class = "details-column">
                <div class = "one-info">
                    <p>Vreme ulaska:</p>
                    <p>{{checkInTime}}</p>
                </div>
                <div class = "one-info">
                    <p>Vreme izlaska:</p>
                    <p>{{checkOutTime}}</p>
                </div>
                <div class = "one-info">
                    <p>Broj ljudi:</p>
                    <p>{{numOfGuests}}</p>
                </div>
                <div class = "one-info">
                    <p>Broj soba:</p>
                    <p>{{numOfRooms}}</p>
                </div>
                <div class = "one-info">
                    <p>Cena po noći: </p>
                    <p>{{costForNight}}</p>
                </div>
            </div>
            <div class = "ap-desc">
                <p class="title-desc">OPIS APARTMANA</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.

                    Vestibulum dignissim orci ut libero luctus, vitae vehicula nibh gravida. Phasellus non velit vitae eros imperdiet venenatis vitae at metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus tincidunt nec dui ac faucibus. Integer consectetur ipsum id purus posuere vehicula. Pellentesque vitae viverra lacus. Suspendisse consectetur lectus risus, id interdum justo tempus vitae. Fusce sollicitudin sed justo id eleifend. Nunc mi magna, dignissim quis dolor non, blandit dapibus ante. Aenean lectus tellus, ullamcorper sit amet augue eget, suscipit dapibus lectus. Nulla feugiat lobortis ornare. Donec tincidunt dolor sed mauris sollicitudin elementum. Vivamus pharetra imperdiet magna, vitae mattis orci vehicula ultrices. Nam lobortis libero eget condimentum tristique.</p>
            </div>
        </div>

        <div class = "other-image-line">
            <div class = "one-image-row">
                <div class = "one-image">

                </div>
                <div class = "one-image">
                    
                </div>
                <div class = "one-image">
                    
                </div>

            </div>
            <div class = "one-image-row">
                <div class = "one-image">

                </div>
                <div class = "one-image">
                    
                </div>
                <div class = "one-image">
                    
                </div>

            </div>
            <div class = "one-image-row">
                <div class = "one-image">

                </div>
                <div class = "one-image">
                    
                </div>
                <div class = "one-image">
                    
                </div>

            </div>
            <div class = "one-image-row">
                <div class = "one-image">

                </div>
                <div class = "one-image">
                    
                </div>
                <div class = "one-image">
                    
                </div>

            </div>
        </div>

        <button class="submit">Rezerviši?</button>

        <div class = "comments">
            <p>Komentari:</p>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
            <div class = "comment-row">
                <div class = "comment-from">
                    <a href = "">Neko Nekic</a>
                </div>
                <div class = "comment-desc">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum est justo, sagittis efficitur magna scelerisque ac. Vivamus eleifend, nunc ut porttitor convallis, orci orci sollicitudin mi, et hendrerit ipsum massa sit amet velit. Donec aliquam lectus quis bibendum consequat. Maecenas et sollicitudin mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut volutpat magna. Vivamus consectetur nulla turpis, eget fermentum nisi scelerisque ut. Quisque in enim dignissim, rhoncus justo et, vestibulum dui. Sed luctus malesuada ligula sit amet faucibus. Proin scelerisque placerat sem vitae lobortis.</p>
                </div>

            </div>
        </div>
    
    </div>
	`,
	mounted () {
		axios
			.get("/apartments/" + this.$route.query.id)
			.then(response => {
				this.apartment = response.data;
				this.picture = "";
				this.checkInTime = response.data.checkInTime;
				this.checkOutTime = response.data.checkOutTime;
				this.numOfGuests = response.data.numberOfGuests;
				this.titleOfApartment= response.data.apartmentTitle;
				this.numOfRooms = response.data.numberOfRooms;
				this.costForNight = response.data.costForNight;
				this.picture = response.data.apartmentPictures[0];
				
			})
			
	}
});