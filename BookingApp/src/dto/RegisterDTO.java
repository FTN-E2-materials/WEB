package dto;

import beans.Gender;
import beans.UserRole;

public class RegisterDTO {
	private String name;
	private String surname;
	private String username;
	private String password;
	private Gender gender;
	private String profilePicture;
	private boolean blocked;
	private UserRole role;
	public RegisterDTO() {
		// TODO Auto-generated constructor stub
	}
	public RegisterDTO(String name, String surname, String username, String password, Gender gender) {
		super();
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.gender = gender;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	
	
	
	
	
}
