package beans;

import java.util.ArrayList;
import java.util.List;

public class Apartment implements IIdentifiable<Integer> {
	private int id;
	private String apartmentTitle;
	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuests;
	private Location location;
	private List<ApartmentComment> comments;
	private double costForNight;
	private boolean active;
	private int checkInTime;
	private int checkOutTime;
	private List<String> apartmentPictures;
	
	public Apartment() {}
	
	public Apartment(String apartmentTitle, ApartmentType type, int numberOfRooms, int numberOfGuests, Location location,
			List<ApartmentComment> comments, double costForNight, boolean active, int checkInTime, int checkOutTime, List<String> apartmentPictures) {
		super();
		this.apartmentTitle = apartmentTitle;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuests = numberOfGuests;
		this.location = location;
		this.comments = comments;
		this.costForNight = costForNight;
		this.active = active;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.apartmentPictures = apartmentPictures;
	}
	

	public String getApartmentTitle() {
		return apartmentTitle;
	}

	public void setApartmentTitle(String apartmentTitle) {
		this.apartmentTitle = apartmentTitle;
	}

	public List<String> getApartmentPictures() {
		return apartmentPictures;
	}

	public void setApartmentPictures(List<String> apartmentPictures) {
		this.apartmentPictures = apartmentPictures;
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

	public List<ApartmentComment> getComments() {
		return comments;
	}

	public void setComments(List<ApartmentComment> comments) {
		this.comments = comments;
	}

	public double getCostForNight() {
		return costForNight;
	}

	public void setCostForNight(double costForNight) {
		this.costForNight = costForNight;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(int checkInTime) {
		this.checkInTime = checkInTime;
	}

	public int getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(int checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	@Override
	public Integer getID() {
		return id;
	}

	@Override
	public void setID(Integer id) {
		this.id = id;
		
	}

	@Override
	public boolean compareTo(Integer id) {
		if (this.id == id)
			return true;
		return false;
	}
	
	
}
