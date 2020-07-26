package model;

import java.util.ArrayList;
import java.util.List;

public class Host extends User {
	private List<Apartment> forRent;
		
	public Host(String username, String password, String name, String surname, Gender gender, UserRole role) {
		super(username, password, name, surname, gender, role);
		forRent = new ArrayList<Apartment>();
	}

	public List<Apartment> getForRent() {
		return forRent;
	}

	public void setForRent(List<Apartment> forRent) {
		this.forRent = forRent;
	}

	public void addApartmentForRent(Apartment apartment) {
		this.forRent.add(apartment);
	}
	
	public boolean removeApartment(Apartment apartment) {
		return this.forRent.remove(apartment);
	}
}
