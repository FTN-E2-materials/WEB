package dto;

import java.util.List;

import beans.City;
import beans.State;

public class LocationsDTO {
	private List<City> cities;
	private List<State> states;
	private List<String> formatForShow;
	
	public LocationsDTO() {
		// TODO Auto-generated constructor stub
	}

	public LocationsDTO(List<City> cities, List<State> states, List<String> formatForShow) {
		super();
		this.cities = cities;
		this.states = states;
		this.formatForShow = formatForShow;
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	public List<State> getStates() {
		return states;
	}

	public void setStates(List<State> states) {
		this.states = states;
	}

	public List<String> getFormatForShow() {
		return formatForShow;
	}

	public void setFormatForShow(List<String> formatForShow) {
		this.formatForShow = formatForShow;
	}
	
	
	

}
