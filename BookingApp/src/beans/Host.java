package beans;

import java.util.ArrayList;
import java.util.List;

import com.sun.jdi.Type;

public class Host extends User {
	private List<Apartment> forRent;
		
	public Host() {
		super();
	}
	
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
	
	public void updateRentApartments(Apartment apartment) {
		List<Apartment> apartments = new ArrayList<Apartment>();
		for (Apartment a : this.getForRent()) {
			if (a.compareTo(apartment.getID())) {
				apartments.add(apartment);
			} else {
				apartments.add(a);
			}
		}
		this.setForRent(apartments);
	}

	@Override
	public String getID() {
		return this.getUsername();
	}

	@Override
	public void setID(String id) {
		this.setUsername(id);
	}

	@Override
	public boolean compareTo(String id) {
		if(this.getUsername().equals(id)) {
			return true;
		}
		return false;
	}
	
	public boolean isApartmentMine(Apartment a) {
		return false;
	}

}
