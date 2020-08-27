package dao;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;


import beans.City;
import beans.State;

public class CityDao extends JSONRepository<City, Integer> {

	public CityDao(String path) {
		super(path, new TypeToken<List<City>>(){}.getType(), new Gson());
	}


	public City saveCity(City city) throws JsonSyntaxException, IOException {
		city.setID(getAll().size());
		save(city);
		return city;
	}
	
	public List<City> getAllCitiesForOneState(State state) throws JsonSyntaxException, IOException {
		ArrayList<City> wantedCities = new ArrayList<City>();
		ArrayList<City> allCities = (ArrayList<City>) getAll();
		for (City city : allCities) {
			if (city.getState().getState().equals(state.getState())) {
				wantedCities.add(city);
			}
		}
		
		return wantedCities;
	}
	

}
