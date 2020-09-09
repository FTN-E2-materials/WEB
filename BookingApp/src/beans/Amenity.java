package beans;

public class Amenity implements IIdentifiable<Integer>  {
	private int id;
	private String amenityName;
	private boolean deleted;
	
	public Amenity() {
		this.deleted = false;
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

	@Override
	public Integer getID() {
		return id;
	}

	@Override
	public void setID(Integer id) {
		this.id = id;
		
	}

	@Override
	public boolean compareTo(Integer id) {
		if (this.id == id) {
			return true;
		} 
		return false;
	}
	@Override
	public int hashCode() {
		return this.id * 1612;
	}
	

}
