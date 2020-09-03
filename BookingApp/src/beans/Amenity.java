package beans;

public class Amenity {
	private int id;
	private String amenityName;
	private boolean deleted;
	
	public Amenity() {
		// TODO Auto-generated constructor stub
	}

	public Amenity(int id, String amenityName, boolean deleted) {
		super();
		this.id = id;
		this.amenityName = amenityName;
		this.deleted = deleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAmenityName() {
		return amenityName;
	}

	public void setAmenityName(String amenityName) {
		this.amenityName = amenityName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	

}
