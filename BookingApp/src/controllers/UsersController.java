package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.User;
import dto.LoginDTO;
import dto.ProfileViewDTO;
import dto.RegisterDTO;
import services.UsersService;
import spark.Session;

public class UsersController {
	private UsersService usersService;
	private static Gson gs = new Gson();
	
	public UsersController(UsersService usersService) {
		this.usersService = usersService;

		post("/user/login", (req, res) -> {
			res.type("application/json");
			
			try {
				User tryLogin = usersService.login(gs.fromJson(req.body(), LoginDTO.class));
				if (tryLogin != null) {
					if (tryLogin.isBlocked()) {
						return "";
					}
					
					Session session = req.session(true);
					User isLoggedIn = session.attribute("user");
					if (isLoggedIn == null) {
						session.attribute("user", tryLogin);
					}
					
				} else {
					return "";
				}
				return gs.toJson(tryLogin);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/logout", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			if (session.attribute("user") != null) {
				session.invalidate();
			}
			return "";
		});
		
		get("/user/seeIfLogged", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User user = session.attribute("user");
			return gs.toJson(user);
		});

	
		
		post("/user/register", (req, res) -> {
			res.type("application/json");

			try {
				User tryRegister = usersService.register(gs.fromJson(req.body(), RegisterDTO.class));
				if (tryRegister != null) {
					Session session = req.session(true);
					User isLoggedIn = session.attribute("user");
					if (isLoggedIn == null) {
						session.attribute("user", tryRegister);
					}
					
				} else {
					return "";
				}
				return gs.toJson(tryRegister);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/user/updateUser", (req, res) -> {
		 
			Session ss = req.session(true);
			User u = ss.attribute("user");

			if(u instanceof Guest) {
				User us = usersService.updateUser(gs.fromJson(req.body(), Guest.class));
				ss.attribute("user", us);
				return gs.toJson(us);
			}
			else if(u instanceof Host) {
				User us =usersService.updateUser(gs.fromJson(req.body(), Host.class));
				ss.attribute("user", us);
				return gs.toJson(us);
			}
			else {
				User us =usersService.updateUser(gs.fromJson(req.body(), Administrator.class));
				ss.attribute("user",us);
				return gs.toJson(us);
			}
		});

		//change password
		post("/user/changePassword", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User u = ss.attribute("user");
			User updatedUser=usersService.changePassword(u,gs.fromJson(req.body(),String.class));
			ss.attribute("user",updatedUser);
			return gs.toJson(updatedUser);

		});

		get("/user/getAll", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(usersService.getAll());
				
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/users/getForHost", (req, res) -> {
			res.type("application/json");
			
			try {
 				Session ss = req.session(true);
				User host = ss.attribute("user");
				if(host!=null)
				{
					return gs.toJson(usersService.getApartmentsForHost(host));
				}
				else
				{
					return "";
				}
				
				
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/:id", (req, res) -> {
			res.type("application/json");
			try {
				System.out.println(req.params("id"));
				return gs.toJson(usersService.getByID(req.params("id"))); 
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/user/isThisMe/:id", (req, res) -> {
			res.type("application/json");
			try {
				System.out.println(req.params("id"));
				Session ss = req.session(true);
				User loggedIn = ss.attribute("user");
				User requestedRoute = usersService.getByID(req.params("id")); 
				if (loggedIn != null) {
					if(requestedRoute.compareTo(loggedIn.getUsername())) {
						return gs.toJson(new ProfileViewDTO(requestedRoute, true));
					} else {
						return gs.toJson(new ProfileViewDTO(requestedRoute, false));
					}
				} else {
					return gs.toJson(new ProfileViewDTO(requestedRoute, false));
				}
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
	}
}
