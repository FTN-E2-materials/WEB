package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Host;
import beans.ReservationStatus;
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
 
		put(("/apartments/addApartment", (req,res) ->{
			Session session=req.session(true);
			Host user=session.attribute("user");
			ApartmentDTO apartment=gs.fromJson(req.body(),ApartmentDTO.class);
			// apartment.setHost(user);
			return apartmentService.saveNewApartment(apartment);

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
		
		
		
	}
	
	

}
