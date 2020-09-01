package dto;

public class SearchDTO {
	public String location;
	public String numberOfGuests;
	public String numberOfRooms;
	public String dateFrom;
	public String dateTo;
	
	public SearchDTO() {
		// TODO Auto-generated constructor stub
	}
	
	

	public SearchDTO(String location, String numberOfGuests, String numberOfRooms, String dateFrom, String dateTo) {
		super();
		this.location = location;
		this.numberOfGuests = numberOfGuests;
		this.numberOfRooms = numberOfRooms;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}



	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getNumberOfGuests() {
		return numberOfGuests;
	}

	public void setNumberOfGuests(String numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}

	public String getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(String numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getDateTo() {
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}
	
	

}
