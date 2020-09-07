package services;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonSyntaxException;

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

	public User register(RegisterDTO tryRegisterUser) throws JsonSyntaxException, IOException {
		User seeIfExists = userDao.getByID(tryRegisterUser.getUsername());
		if (seeIfExists != null) {
			return null;
		}
		
		User newUser = new Guest(tryRegisterUser.getName(), tryRegisterUser.getSurname(),
				tryRegisterUser.getUsername(), tryRegisterUser.getPassword(), 
				tryRegisterUser.getGender(), UserRole.Guest);
		System.out.println(tryRegisterUser.getUsername());
		userDao.create(newUser);
		return newUser;
	}

	public User changePassword(PasswordChangeDTO user) throws JsonSyntaxException, IOException {
		User userToChange = user.getUser();
		userToChange.setPassword(user.getPassword());
		return userDao.update(userToChange);
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

	public User updateUser(User fromJson) throws JsonSyntaxException, IOException {
		return userDao.update(fromJson);
	}


}
