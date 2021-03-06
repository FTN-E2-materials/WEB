package dao;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;


import beans.Apartment;


public class ApartmentDao extends JSONRepository<Apartment, Integer> {

	public ApartmentDao(String path) {
		super(path, new TypeToken<List<Apartment>>(){}.getType(), new Gson());

	}
	
	public int generateNextID() throws JsonSyntaxException, IOException {
		return getAll().size() + 1;
	}
}
