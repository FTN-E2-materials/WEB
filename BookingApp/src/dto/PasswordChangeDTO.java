package dto;

import beans.User;

public class PasswordChangeDTO {
	private User user;
	private String password;
	
	public PasswordChangeDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public PasswordChangeDTO(User user, String password) {
		this.user = user;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	

}
