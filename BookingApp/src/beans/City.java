package beans;

public class City implements IIdentifiable<Integer> {
	private int id;
	private String city;
	private double zipCode;
	private State state;
	private boolean deleted;
	
	public City(String city, double zipCode, State state) {
		super();
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public double getZipCode() {
		return zipCode;
	}
	public void setZipCode(double zipCode) {
		this.zipCode = zipCode;
	}
	public State getState() {
		return state;
	}
	public void setState(State state) {
		this.state = state;
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
		if (this.id == id) 
			return true;
		
		return false;
	}
	public boolean isDeleted() {
		return deleted;
	}
	@Override
	public void setDeleted(boolean value) {
		this.deleted = value;
	}
	
	
}
