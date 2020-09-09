package beans;

public class ApartmentComment {
	private Guest guest;
	private int apartment;
	private String text;
	private Grade grade;
	private boolean hidden;
	private int id;
	
	public ApartmentComment() {}
	
	public ApartmentComment(Guest guest, int apartment, String text, Grade grade) {
		super();
		this.guest = guest;
		this.apartment = apartment;
		this.text = text;
		this.grade = grade;
		this.hidden = false;
	}
	
	public Guest getGuest() {
		return guest;
	}
	
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	
	public int getApartment() {
		return apartment;
	}
	
	public void setApartment(int apartment) {
		this.apartment = apartment;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public Grade getGrade() {
		return grade;
	}
	
	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
