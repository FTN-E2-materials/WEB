package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Amenity;

public class AmenityDao extends JSONRepository<Amenity, Integer> {

	public AmenityDao(String path) {
		super(path, new TypeToken<List<Amenity>>(){}.getType(), new Gson());

	}
	
	public int generateNextID() throws JsonSyntaxException, IOException {
		return getAll().size() + 1;
	}

}
