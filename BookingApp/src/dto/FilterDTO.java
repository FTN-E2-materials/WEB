package dto;

import java.util.List;

import beans.Amenity;
import beans.Apartment;
import beans.ReservationStatus;

public class FilterDTO {
	private List<Amenity> list;
	private boolean ascending;
	private boolean descending;
	private String type;
	private List<ReservationStatus> status;
	private List<String> apartments;
	
	public FilterDTO() {
		// TODO Auto-generated constructor stub
	}
	public List<Amenity> getList() {
		return list;
	}
	public void setList(List<Amenity> list) {
		this.list = list;
	}
	public boolean isAscending() {
		return ascending;
	}
	public void setAscending(boolean ascending) {
		this.ascending = ascending;
	}
	public boolean isDescending() {
		return descending;
	}
	public void setDescending(boolean descending) {
		this.descending = descending;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<ReservationStatus> getStatus() {
		return status;
	}
	public void setStatus(List<ReservationStatus> status) {
		this.status = status;
	}
	public List<String> getApartments() {
		return apartments;
	}
	public void setApartments(List<String> apartments) {
		this.apartments = apartments;
	}
	
	
}

