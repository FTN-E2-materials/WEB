package services;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;

import beans.Guest;
import beans.User;
import beans.UserRole;
import dao.UsersDao;
import dto.LoginDTO;
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
		userDao.create(newUser);
		return newUser;
	}

//public User changePassword(string password) throws JsonSyntaxException, IOException {}


}
