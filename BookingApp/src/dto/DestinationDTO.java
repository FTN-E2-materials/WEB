package dto;

public class DestinationDTO {
	private String name;
	private String imagePath;
	private int count;
	private int id;
	
	public DestinationDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public DestinationDTO(String name, String imagePath) {
		super();
		this.name = name;
		this.setImagePath(imagePath);
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return this.id * 5;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
