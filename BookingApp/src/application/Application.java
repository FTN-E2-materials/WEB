package application;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import beans.Address;
import beans.Apartment;
import beans.ApartmentComment;
import beans.ApartmentType;
import beans.City;
import beans.Location;
import beans.State;
import controllers.ApartmentController;
import controllers.UsersController;
import dao.ApartmentDao;
import dao.CityDao;
import dao.StateDao;
import dao.UsersDao;
import services.ApartmentService;
import services.UsersService;

public class Application {

	public static void main(String[] args) throws IOException {

		port(8088);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		UsersDao usersDao = new UsersDao("./files/users.json");
		UsersService usersService = new UsersService(usersDao);
		UsersController usersController = new UsersController(usersService);
		
		CityDao cityDao = new CityDao("./files/cities.json");
		StateDao stateDao = new StateDao("./files/states.json");

		ApartmentDao apartmentDao = new ApartmentDao("./files/apartments.json");
		ApartmentService apartmentService = new ApartmentService(apartmentDao);
		ApartmentController apartmentControlle = new ApartmentController(apartmentService);
		
		
		/*
		
		ArrayList<String> pictures = new ArrayList<String>();
		pictures.add("./static/images/apartments/a11");
		pictures.add("./static/images/apartments/a12");
		pictures.add("./static/images/apartments/a13");
		pictures.add("./static/images/apartments/a14");
		pictures.add("./static/images/apartments/a15");
		pictures.add("./static/images/apartments/a17");
		Address address = new Address("Trg srpskih dobrovoljaca", 5, new City("Novi Sad", 21000, new State("Srbija")));
		Apartment apartment = new Apartment("Apartman Jelena", ApartmentType.FullApartment, 3, 5, new Location(50, 50, address), new ArrayList<ApartmentComment>(), 
				50, true, 9, 12, pictures);
		
		apartmentDao.save(apartment);
		
		*/
		get("/test", (req, res) -> {
			return "Works";
		});
	}

}
