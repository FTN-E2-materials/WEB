package dao;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;


import beans.State;

public class StateDao extends JSONRepository<State, Integer> {

	public StateDao(String path) {
		super(path, new TypeToken<List<State>>(){}.getType(), new Gson());
	}
	

	public State saveState(State state) throws JsonSyntaxException, IOException {
		state.setID(getAll().size());
		save(state);
		return state;
	}
	

}
