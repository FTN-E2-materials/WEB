package dto;

import beans.User;

public class ProfileViewDTO {
	private User currentUser;
	private boolean isThisMe;
	
	public ProfileViewDTO() {
		// TODO Auto-generated constructor stub
	}

	public ProfileViewDTO(User currentUser, boolean isThisMe) {
		super();
		this.currentUser = currentUser;
		this.isThisMe = isThisMe;
	}

	public User getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}

	public boolean isThisMe() {
		return isThisMe;
	}

	public void setThisMe(boolean isThisMe) {
		this.isThisMe = isThisMe;
	}
	
}
