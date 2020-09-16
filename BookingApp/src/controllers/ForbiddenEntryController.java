package controllers;

import static spark.Spark.get;

import beans.User;
import beans.UserRole;
import spark.Session;

public class ForbiddenEntryController {
	
	public ForbiddenEntryController() {
		get("reservations/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					res.status(200);
					return "Okay";
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("editProfile/canISee", (req,res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					res.status(200);
					return "Okay";
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		

		get("apartmentss/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Guest) {
						res.status(403);
						return "";
					} else {
						res.status(200);
						return "Okay";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("holidays/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Administrator) {
						res.status(200);
						return "Okay";
					} else {
						res.status(403);
						return "";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
		
		get("amenities/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Administrator) {
						res.status(200);
						return "Okay";
					} else {
						res.status(403);
						return "";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
		get("addApartment/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Host) {
						res.status(200);
						return "Okay";
					} else {
						res.status(403);
						return "";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
		get("editApartment/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Host || u.getRole() == UserRole.Administrator) {
						res.status(200);
						return "Okay";
					} else {
						res.status(403);
						return "";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		get("userPreview/canISee", (req, res) -> {
			res.type("application/json");
			try {
				Session s = req.session(true);
				User u = s.attribute("user");
				if (u == null) {
					res.status(403);
					return "";
				} else {
					if (u.getRole() == UserRole.Host || u.getRole() == UserRole.Administrator) {
						res.status(200);
						return "Okay";
					} else {
						res.status(403);
						return "";
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
			
		});
		
	}

}
