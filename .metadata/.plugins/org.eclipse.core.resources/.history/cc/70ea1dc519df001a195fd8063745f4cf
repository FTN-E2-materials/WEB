package model;

import java.util.ArrayList;
import java.util.List;

public class Guest extends User {
	private List<Apartment> rentedApartments;
	private List<Reservation> allReservations;

	public Guest(String username, String password, String name, String surname, Gender gender, UserRole role) {
		super(username, password, name, surname, gender, role);
		this.rentedApartments = new ArrayList<Apartment>();
		this.allReservations = new ArrayList<Reservation>();
	}

	public List<Apartment> getRentedApartments() {
		return rentedApartments;
	}

	public void setRentedApartments(List<Apartment> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}

	public List<Reservation> getAllReservations() {
		return allReservations;
	}

	public void setAllReservations(List<Reservation> allReservations) {
		this.allReservations = allReservations;
	}
	
	public void rentApartment(Apartment apartment) {
		this.rentedApartments.add(apartment);
	}
	
	public boolean removeRentedApartment(Apartment apartment) {
		return this.rentedApartments.remove(apartment);
	}
	
	public void addReservation(Reservation reservation) {
		this.allReservations.add(reservation);
	}
	
	public boolean removeReservation(Reservation reservation) {
		return this.allReservations.remove(reservation);
	}
	

}
