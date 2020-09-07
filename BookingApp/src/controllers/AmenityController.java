package controllers;

import static spark.Spark.get;
import static spark.Spark.put;
import static spark.Spark.post;
import static spark.Spark.delete;

import com.google.gson.Gson;

import beans.Amenity;
import beans.User;
import beans.UserRole;
import services.AmenityService;
import spark.Session;

public class AmenityController {
	private AmenityService amenityService;
	private static Gson gs = new Gson();
	
	public AmenityController(AmenityService amenityService) {
		this.amenityService = amenityService;
		
		get("/amenities", (req, res) -> {
			res.type("application/json");
			try {
				Session ss = req.session(true);
				User user = ss.attribute("user");
				return gs.toJson(amenityService.getAllAmenities());
				/*
				if (user.getRole() == UserRole.Administrator) {
				} else {
					return null;
				}*/
			} catch(Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("/amenities/editAmenity", (req, res) -> {
			try {
				amenityService.editAmenity(gs.fromJson(req.body(), Amenity.class));
				return "Success";
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		put("/amenities/addAmenity", (req, res) -> {
			try {
				amenityService.addAmenity(gs.fromJson(req.body(), String.class));
				return "Success";
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		delete("/amenities/deleteAmenity/:id", (req, res) -> {
			try {
				amenityService.deleteAmenity(gs.fromJson(req.params("id"), String.class));
				return "Success";
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		
	}
}
