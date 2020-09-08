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
	private String checkInTime;
	private String checkOutTime;
	private List<String> apartmentPictures;
	private String shortDescription;
	private Currency costCurrency;
	private boolean commentsEnabled;
	private boolean deleted;
	private List<Amenity> amenities;
	private List<Period> periodsForRent;
	
	public Apartment() {}
	
	public Apartment(String apartmentTitle, ApartmentType type, int numberOfRooms, int numberOfGuests, Location location,
			List<ApartmentComment> comments, double costForNight, boolean active, String checkInTime, String checkOutTime, List<String> apartmentPictures) {
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
		this.commentsEnabled = true;
		this.periodsForRent = new ArrayList<Period>();
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

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescrtiption) {
		this.shortDescription = shortDescrtiption;
	}

	public Currency getCostCurrency() {
		return costCurrency;
	}

	public void setCostCurrency(Currency costCurrenct) {
		this.costCurrency = costCurrenct;
	}

	public boolean isCommentsEnabled() {
		return commentsEnabled;
	}

	public void setCommentsEnabled(boolean commentsEnabled) {
		this.commentsEnabled = commentsEnabled;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	public double translateCostToSameCurrency() {
		if (this.costCurrency == Currency.Euro) {
			return this.costForNight;
		} else if (this.costCurrency == Currency.Dinar) {
			return this.costForNight * 0.0085;
		} else if (this.costCurrency == Currency.Dollar) {
			return this.costForNight * 0.85;
		} else {
			return this.costForNight;
		}
	}

	public List<Amenity> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenity> amenities) {
		this.amenities = amenities;
	}

	public List<Period> getPeriodsForRent() {
		return periodsForRent;
	}

	public void setPeriodsForRent(List<Period> periodsForRent) {
		this.periodsForRent = periodsForRent;
	}
}
