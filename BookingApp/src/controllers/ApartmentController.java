package controllers;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import beans.Apartment;
import beans.Guest;
import beans.Host;
import beans.ReservationStatus;
import beans.User;
import beans.UserRole;
import dto.ApartmentDTO;
import dto.CommentDTO;
import dto.DeleteCommentDTO;
import dto.FilterDTO;
import dto.ReservationDTO;
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
		
		delete("apartment/deleteApartment/:id", (req, res) -> {
			res.type("application/json");
			try {
				apartmentService.deleteAparmtent(req.params("id"));
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
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
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					Response.status(403).build();
				}
				CommentDTO cm = gs.fromJson(req.body(), CommentDTO.class);
				cm.setUsername(u.getUsername());
				return gs.toJson(apartmentService.addComment(cm));
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
		
		get("apartment/reservationsForUser", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					return Response.status(403).build();
				} 
				
				if (u.getRole() == UserRole.Administrator) {
					return gs.toJson(apartmentService.getReservationsForAdmin());
				} else {
					return gs.toJson(apartmentService.getReservationsByUser(u.getUsername()));
				}
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
		
		post("/apartments/updateApartment", (req, res) -> {
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
				return gs.toJson(apartmentService.updateApartment(apartment, host));
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
		
		get("apartment/getActiveForHost", (req, res) -> {
			try {
				res.type("application/json");
				Session ss = req.session(true);
				User host = ss.attribute("user");
				return gs.toJson(apartmentService.getActiveForHost(host));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("apartment/getInactiveForHost", (req, res) -> {
			try {
				res.type("application/json");
				Session ss = req.session(true);
				User host = ss.attribute("user");
				return gs.toJson(apartmentService.getInactiveForHost(host));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("apartment/getSortedCheapest", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.sortCheapest());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("apartment/getSortedMostExpensive", (req, res) -> {
			try {
				res.type("application/json");
				return gs.toJson(apartmentService.sortMostExpensive());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("apartment/hideComment", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(apartmentService.deleteComment(gs.fromJson(req.body(), DeleteCommentDTO.class)));
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		});
		
		post("apartment/showComment", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(apartmentService.showComment(gs.fromJson(req.body(), DeleteCommentDTO.class)));
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		});
		
		post("apartment/filterByAmenity", (req, res) -> {
			res.type("application/json");	
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u != null) {
					if (u.getRole() == UserRole.Administrator) {
						return gs.toJson(apartmentService.filterByAmenityForAdmin(gs.fromJson(req.body(), FilterDTO.class)));					
					}
				}
				return gs.toJson(apartmentService.filterByAmenity(gs.fromJson(req.body(), FilterDTO.class)));
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		post("apartment/filterAptForHost", (req, res) -> {
			res.type("application/json");	
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u != null) {
					if (u.getRole() != UserRole.Host) {
						return null;					
					}
				}
				return gs.toJson(apartmentService.filterForHost(gs.fromJson(req.body(), FilterDTO.class), (Host) u));
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		put("apartment/deactivate/:id", (req, res) -> {
			res.type("application/json");
			
			try {
				Session ss = req.session(true);
				Host h = (Host) ss.attribute("user");
				return gs.toJson(apartmentService.deactivateApartment(req.params("id"), h));
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		put("apartment/activate/:id", (req, res) -> {
			res.type("application/json");
			
			try {
				Session ss = req.session(true);
				Host h = (Host) ss.attribute("user");
				return gs.toJson(apartmentService.activateApartment(req.params("id"), h));
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		post("apartment/reserveApartment", (req, res) -> {
			res.type("application/json");
			try {
				Session ss = req.session(true);
				User u = ss.attribute("user");
				if (u == null) {
					return Response.status(403).build();
				}
				
				if (u.getRole() != UserRole.Guest) {
					return Response.status(403).build();
				}
				
				return gs.toJson(apartmentService.reserveApartment(gs.fromJson(req.body(), ReservationDTO.class), (Guest) u));
				
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		post("apartment/filterReservations", (req, res) -> {
			try {
				res.type("application/json");
				Session ss = req.session(true);
				User u = ss.attribute("user");
				if (u == null) {
					return Response.status(403).build();
				}
				
				return gs.toJson(apartmentService.filterReservations(gs.fromJson(req.body(), FilterDTO.class), u));
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			
		});
		
		get("apartment/canIComment/:id", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u.getRole() != UserRole.Guest) {
					return Response.status(403).build();
				}
				return gs.toJson(apartmentService.canIComment(req.params("id"), (Guest)u));
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
	}
	
	

}
