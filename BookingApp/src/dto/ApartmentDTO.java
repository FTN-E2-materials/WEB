package dto;

import java.util.List;

import beans.Amenity;
import beans.ApartmentType;
import beans.Currency;
import beans.Location;
import beans.Period;

public class ApartmentDTO {
	private String apartmentTitle;
	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private double costForNight;
	private Currency currency;
	private String checkInTime;
	private String checkOutTime;
	private List<String> apartmentPictures;
	private List<Amenity> amenities;
	private Period period;
	private boolean commentsEnabled;
	
	public ApartmentDTO(String apartmentTitle, ApartmentType type, int numberOfRooms, int numberOfGuests, Location location,
			double costForNight, String checkInTime, String checkOutTime, List<String> apartmentPictures,Currency currency) {
		super();
		this.apartmentPictures = apartmentPictures;
		this.apartmentTitle = apartmentTitle;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.costForNight = costForNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.currency=currency;
	}
	
	
	public List<String> getApartmentPictures() {
		return apartmentPictures;
	}


	public void setApartmentPictures(List<String> apartmentPictures) {
		this.apartmentPictures = apartmentPictures;
	}


	public String getApartmentTitle() {
		return apartmentTitle;
	}

	public void setApartmentTitle(String apartmentTitle) {
		this.apartmentTitle = apartmentTitle;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency c) {
		this.currency = c;
	}

	public ApartmentType getType() {
		return type;
	}
	public void setType(ApartmentType type) {
		this.type = type;
	}
	public int getNumberOfRooms() {
		return numberOfRooms;
	}
	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}
	public int getNumberOfGuests() {
		return numberOfGuests;
	}
	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public double getCostForNight() {
		return costForNight;
	}
	public void setCostForNight(double costForNight) {
		this.costForNight = costForNight;
	}
	public String getCheckInTime() {
		return checkInTime;
	}
	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}
	public String getCheckOutTime() {
		return checkOutTime;
	}
	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}


	public List<Amenity> getAmenities() {
		return amenities;
	}


	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}


	public Period getPeriod() {
		return period;
	}


	public void setPeriod(Period period) {
		this.period = period;
	}


	public boolean isCommentsEnabled() {
		return commentsEnabled;
	}


	public void setCommentsEnabled(boolean commentsEnabled) {
		this.commentsEnabled = commentsEnabled;
	}
	

}
