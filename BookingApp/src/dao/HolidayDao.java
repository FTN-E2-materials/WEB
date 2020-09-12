package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Holiday;

public class HolidayDao extends JSONRepository<Holiday, Integer> {

	public HolidayDao(String path) {
		super(path, new TypeToken<List<Holiday>>(){}.getType(), new Gson());

	}
	
	public int generateNextID() throws JsonSyntaxException, IOException {
		return getAll().size() + 1;
	}
}
