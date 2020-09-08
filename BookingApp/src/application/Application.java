package application;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import beans.City;
import beans.Gender;
import beans.Host;
import beans.State;
import beans.UserRole;
import controllers.AmenityController;
import controllers.ApartmentController;
import controllers.UsersController;
import dao.AmenityDao;
import dao.ApartmentDao;
import dao.ReservationDao;
import dao.UsersDao;
import dto.LocationsDTO;
import services.AmenityService;
import services.ApartmentService;
import services.UsersService;

public class Application {

	public static void main(String[] args) throws IOException {

		port(8088);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		UsersDao usersDao = new UsersDao("./files/users.json");
		UsersService usersService = new UsersService(usersDao);
		UsersController usersController = new UsersController(usersService);
		
		ApartmentDao apartmentDao = new ApartmentDao("./files/apartments.json");
		ReservationDao reservationDao = new ReservationDao("./files/reservations.json");
		ApartmentService apartmentService = new ApartmentService(apartmentDao, usersDao, reservationDao);
		ApartmentController apartmentControlle = new ApartmentController(apartmentService);
		
		AmenityDao amenityDao = new AmenityDao("./files/amenities.json");
		AmenityService amenityService = new AmenityService(amenityDao);
		AmenityController amenityController = new AmenityController(amenityService);
	
		get("/test", (req, res) -> {
			return "Works";
		});
	}

}
