package dto;

import java.util.List;

import beans.Apartment;

public class SearchDTO {
	private String location;
	private String numberOfGuests;
	private String numberOfRooms;
	private String dateFrom;
	private String dateTo;
	private int cost;
	private List<Apartment> apartments;
	private String city;
	private String country;
	
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



	public String getCity() {
		return city;
	}



	public void setCity(String city) {
		this.city = city;
	}



	public String getCountry() {
		return country;
	}



	public void setCountry(String country) {
		this.country = country;
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



	public int getCost() {
		return cost;
	}



	public void setCost(int cost) {
		this.cost = cost;
	}



	public List<Apartment> getApartments() {
		return apartments;
	}



	public void setApartments(List<Apartment> apartments) {
		this.apartments = apartments;
	}
	
	

}
