package dto;

public class CommentDTO {
	private String username;
	private String apartment;
	private String grade;
	private String text;
	
	public CommentDTO(String username, String apartment, String grade, String text) {
		this.username = username;
		this.grade = grade;
		this.text = text;
		this.apartment = apartment;
	}

	public CommentDTO() {}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getApartment() {
		return apartment;
	}

	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	
}
