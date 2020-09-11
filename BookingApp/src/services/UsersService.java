package services;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonSyntaxException;

import beans.Administrator;
import beans.Apartment;
import beans.Gender;
import beans.Guest;
import beans.Host;
import beans.User;
import beans.UserRole;
import dao.UsersDao;
import dto.LoginDTO;
import dto.PasswordChangeDTO;
import dto.RegisterDTO;

public class UsersService {
	private UsersDao userDao;
	private Base64ToImage decoder = new Base64ToImage();
	
	public UsersService(UsersDao usersDao) {
		this.userDao = usersDao;
	}
	
	public User login(LoginDTO tryLoginUser) throws JsonSyntaxException, IOException {
		User triedLoginUser=null;
		if(tryLoginUser.getUsername()!=null) 
		{
			triedLoginUser = userDao.getByID(tryLoginUser.getUsername());
		}
		
		
		if(triedLoginUser != null) {
			if(triedLoginUser.getPassword().equals(tryLoginUser.getPassword())) {
				return triedLoginUser;
			}
		}
		return null;
	}

	public List<User> blockUser(String username) throws JsonSyntaxException, IOException{
		User seeIfExists = userDao.getByID(username);
		if (seeIfExists != null) {
			seeIfExists.setBlocked(true);
			seeIfExists.setUsername(username);
			if(seeIfExists.getRole()==UserRole.Host)
			{
				
				Host updatedUser=(Host) userDao.update(seeIfExists);
				
				if(updatedUser!=null)
				{
					return getAll();
				}
			}
				if(seeIfExists.getRole()==UserRole.Guest)
			{
				Guest updatedUser=(Guest) userDao.update(seeIfExists);
				if(updatedUser!=null)
				{
					return getAll();
				}
			}
		}
		return null;
	}

	public List<User> UnblockUser(String username) throws JsonSyntaxException, IOException{
		User seeIfExists = userDao.getByID(username);
		if (seeIfExists != null) {
			seeIfExists.setBlocked(false);
			if(seeIfExists.getRole()==UserRole.Host)
			{
			
				Host updatedUser=(Host) userDao.update(seeIfExists);
				if(updatedUser!=null)
				{
					return getAll();
				}
			}
				if(seeIfExists.getRole()==UserRole.Guest)
			{
				Guest updatedUser=(Guest) userDao.update(seeIfExists);
				if(updatedUser!=null)
				{
					return getAll();
				}
			}
		}
		return null;
	}

	public User register(RegisterDTO tryRegisterUser) throws JsonSyntaxException, IOException {
		User seeIfExists = userDao.getByID(tryRegisterUser.getUsername());
		if (seeIfExists != null) {
			return null;
		}
		
		if (tryRegisterUser.getRole() == UserRole.Host) {
			Host newHost = new Host(tryRegisterUser.getUsername(), tryRegisterUser.getPassword(), tryRegisterUser.getName(), tryRegisterUser.getSurname(), tryRegisterUser.getGender(), tryRegisterUser.getRole());
			userDao.create(newHost);
			return newHost;
		} else if (tryRegisterUser.getRole() == UserRole.Guest)  {
			Guest guest = new Guest(tryRegisterUser.getUsername(), tryRegisterUser.getPassword(), tryRegisterUser.getName(), tryRegisterUser.getSurname(), tryRegisterUser.getGender(), tryRegisterUser.getRole());
			userDao.create(guest);
			return guest;
		}
		return null;
	}

	public User changePassword(User user, String newPass) throws JsonSyntaxException, IOException {
		user.setPassword(newPass);
		return userDao.update(user);
	}
	
	public User getByID(String username) throws JsonSyntaxException, IOException {
		return userDao.getByID(username);
	}


	public List<Apartment> getApartmentsForHost(User user) throws JsonSyntaxException, IOException {
		Host host=(Host) userDao.getByID(user.getUsername());
		return (List<Apartment>) host.getForRent();
	}

	public List<User> getAll() throws JsonSyntaxException, IOException {
		return (List<User>) userDao.getAll();
	}

	public boolean isThisMineApartment(String params, Host u) {
		for (Apartment a : u.getForRent()) {
			if (a.compareTo(Integer.parseInt(params))) {
				return true;
			}
		}
		return false;
	}

	public boolean canIComment(Guest h, String params) {
		return h.canIComment(Integer.parseInt(params));
	}

	public Administrator updateAdmin(RegisterDTO newUser, Administrator a) throws JsonSyntaxException, IOException {
		a.setGender(newUser.getGender());
		a.setName(newUser.getName());
		a.setSurname(newUser.getSurname());
		if (newUser.getProfilePicture() != null) { 
			if (!newUser.getProfilePicture().isEmpty() && newUser.getProfilePicture().startsWith("data:image")) {
				String path = "images/profile_images/u" + a.getUsername() +".jpg";
				System.out.println(path);
				decoder.Base64DecodeAndSave(newUser.getProfilePicture(), path);
				path = "./" + "images/profile_images/u" + a.getUsername() +".jpg";
				a.setProfilePicture(path);
			} else {
				a.setProfilePicture(newUser.getProfilePicture());
			}
		}
		
		return (Administrator) userDao.update(a);
	}
	
	public Guest updateGuest(RegisterDTO newUser, Guest a) throws JsonSyntaxException, IOException {
		a.setGender(newUser.getGender());
		a.setName(newUser.getName());
		a.setSurname(newUser.getSurname());
		if (newUser.getProfilePicture() != null) {
			if (!newUser.getProfilePicture().isEmpty() && newUser.getProfilePicture().startsWith("data:image")) {
				String path = "images/profile_images/u" + a.getUsername() +".jpg";
				System.out.println(path);
				decoder.Base64DecodeAndSave(newUser.getProfilePicture(), path);
				path = "./" + "images/profile_images/u" + a.getUsername() +".jpg";
				a.setProfilePicture(path);
			} else {
				a.setProfilePicture(newUser.getProfilePicture());
			}
		
		}		
		return (Guest) userDao.update(a);
	}
	
	public Host updateHost(RegisterDTO newUser, Host a) throws JsonSyntaxException, IOException {
		a.setGender(newUser.getGender());
		a.setName(newUser.getName());
		a.setSurname(newUser.getSurname());
		if (newUser.getProfilePicture() != null) {
			if (!newUser.getProfilePicture().isEmpty() && newUser.getProfilePicture().startsWith("data:image")) {
				String path = "images/profile_images/u" + a.getUsername() +".jpg";
				System.out.println(path);
				decoder.Base64DecodeAndSave(newUser.getProfilePicture(), path);
				path = "./" + "images/profile_images/u" + a.getUsername() +".jpg";
				a.setProfilePicture(path);
			} else {
				a.setProfilePicture(newUser.getProfilePicture());
			}
		}
		
		return (Host) userDao.update(a);
	}

	
}
