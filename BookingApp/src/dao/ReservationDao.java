package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Reservation;

public class ReservationDao extends JSONRepository<Reservation, Integer> {

	public ReservationDao(String path) {
		super(path, new TypeToken<List<Reservation>>(){}.getType(), new Gson());

	}
	
	public int generateNextID() throws JsonSyntaxException, IOException {
		return getAll().size() + 1;
	}
}
