package beans;

public class City {
	private String city;
	private double zipCode;
	
	public City(String city, double zipCode) {
		super();
		this.city = city;
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
	
	
}
