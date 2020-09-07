package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Host;
import beans.ReservationStatus;
import beans.User;
import beans.UserRole;
import dto.ApartmentDTO;
import dto.CommentDTO;
import dto.SearchDTO;
import services.ApartmentService;
import spark.Session;

public class ApartmentController {
	private ApartmentService apartmentService;
	private static Gson gs = new Gson();
	
	public ApartmentController(ApartmentService apartmentService) {
		this.apartmentService = apartmentService;
		

		get("/apartments/getActive", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(apartmentService.getActive());
				
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/apartments/sort", (req, res) -> {
			return "";
	 	});
		
		get("/apartments/:id", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.getApartmentById(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
		post("apartments/leaveComment", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.addComment(gs.fromJson(req.body(), CommentDTO.class)));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
		post("apartments/getAvailable", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(apartmentService.findAvailable(gs.fromJson(req.body(), SearchDTO.class)));
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("apartments/reservations/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(apartmentService.getReservationsByUser(req.params("id")));
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/apartments/addApartment", (req,res) -> {
			try {
				res.type("application/json");
				Session session=req.session(true);
				User user=session.attribute("user");
				if (user == null) {
					return "";
				}
				if (user.getRole() != UserRole.Host) {
					return "";
				}
				Host host = (Host) user;
				System.out.println(req.body());
				ApartmentDTO apartment = gs.fromJson(req.body(), ApartmentDTO.class);
				return gs.toJson(apartmentService.saveNewApartment(apartment, host));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		put("/apartments/acceptReservation/:id", (req, res) -> {
			try {
				return apartmentService.updateReservationStatus(req.params("id"), ReservationStatus.Accepted);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		put("/apartments/declineReservation/:id", (req, res) -> {
			try {
				return apartmentService.updateReservationStatus(req.params("id"), ReservationStatus.Declined);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		put("/apartments/withdrawReservation/:id", (req, res) -> {	
			try {
				return apartmentService.updateReservationStatus(req.params("id"), ReservationStatus.Withdrawn);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		put("/apartments/finishReservation/:id", (req, res) -> {
			try {
				return apartmentService.updateReservationStatus(req.params("id"), ReservationStatus.Finished);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		get("apartments/getDisabledDates/:id", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.getReservationsForApartment(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/apartment/getMostPopularDestinations", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.getMostPopularDestinations());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("apartments/getApartmentsByCity/:city", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.getApartmentsByCity(req.params("city")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
	
	

}
