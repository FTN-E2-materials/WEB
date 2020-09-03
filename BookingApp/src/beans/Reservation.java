package beans;

import java.util.Date;

public class Reservation implements IIdentifiable<Integer> {
	private int id;
	private Apartment apartment;
	private Date startDate;
	private int numberOfNights;
	private double cost;
	private String message;
	private Guest guest;
	private ReservationStatus status;
	private boolean deleted;
	public Reservation(Apartment apartment, Date startDate, int numberOfNights, double cost, String message,
			Guest guest, ReservationStatus status) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.cost = cost;
		this.message = message;
		this.guest = guest;
		this.status = status;
		this.deleted = false;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Guest getGuest() {
		return guest;
	}

	public void setGuest(Guest guest) {
		this.guest = guest;
	}

	public ReservationStatus getStatus() {
		return status;
	}

	public void setStatus(ReservationStatus status) {
		this.status = status;
	}

	@Override
	public Integer getID() {
		return this.id;
	}

	@Override
	public void setID(Integer id) {
		this.id = id;
		
	}

	@Override
	public boolean compareTo(Integer id) {
		if (this.id == id) {
			return true;
		}
		return false;
	}
	
	public boolean isDateInIntersection(Date startDate, Date endDate) {
		if (this.startDate.compareTo(startDate) > 0) {
			if (this.startDate.compareTo(endDate) > 0) {
				System.out.println("Asfasfas");
				if ((new Date(this.startDate.getTime() + 24*60*60*1000*this.numberOfNights).compareTo(endDate)) >= 0) {
					return false;
				} else {
					return true;
				}
			} else {
				System.out.println("Asfasfas");
				return true;
			}
		} else {
			if ((new Date(this.startDate.getTime() + 24*60*60*1000*this.numberOfNights).compareTo(startDate)) <= 0) {
				return false;
			} else {
				return true;
			}
		}
	}
	
	public boolean isDeleted() {
		return deleted;
	}

	@Override
	public void setDeleted(boolean value) {
		this.deleted = value;
		
	}
	
	
}
