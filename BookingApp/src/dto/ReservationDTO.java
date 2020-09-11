package dto;

import java.util.Date;

import beans.Apartment;
import beans.Guest;

public class ReservationDTO {
	private Apartment apartment;
	private String startDate;
	private int numberOfNights;
	private String message;
	
	public ReservationDTO() {
		// TODO Auto-generated constructor stub
	}

	public ReservationDTO(Apartment apartment, String startDate, int numberOfNights, String message) {
		super();
		this.apartment = apartment;
		this.startDate = startDate;
		this.numberOfNights = numberOfNights;
		this.message = message;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public int getNumberOfNights() {
		return numberOfNights;
	}

	public void setNumberOfNights(int numberOfNights) {
		this.numberOfNights = numberOfNights;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
