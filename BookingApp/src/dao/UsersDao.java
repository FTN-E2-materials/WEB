package dao;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.User;
import gson.extras.RuntimeTypeAdapterFactory;

public class UsersDao extends JSONRepository<User, String> {

	public UsersDao(String path) {
		super(path, new TypeToken<List<User>>(){}.getType(), createJSONSerializer());

	}
	
	private static Gson createJSONSerializer() {	
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
	        .registerSubtype(Guest.class)
	        .registerSubtype(Administrator.class)
	        .registerSubtype(Host.class);
		
		return new GsonBuilder()
		     .registerTypeAdapterFactory(userAdapterFactory)
	         .create();
		
	}
}
