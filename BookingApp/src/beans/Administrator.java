package beans;

public class Administrator extends User {

	public Administrator() {
		super();
	}
	
	public Administrator(String username, String password, String name, String surname, Gender gender, UserRole role) {
		super(username, password, name, surname, gender, role);
	}
	

	@Override
	public String getID() {
		return this.getUsername();
	}

	@Override
	public void setID(String id) {
		this.setUsername(id);
	}

	@Override
	public boolean compareTo(String id) {
		if(this.getUsername().equals(id)) {
			return true;
		}
		return false;
	}
	
	

}
