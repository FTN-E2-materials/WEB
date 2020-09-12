package beans;

import java.util.Date;

public class Holiday implements IIdentifiable<Integer> {
	private int id;
	private String holidayName;
	private boolean deleted;
	private Date date;
	
	public Holiday() {
		// TODO Auto-generated constructor stub
	}

	public Holiday(int id, String holidayName, boolean deleted, Date date) {
		super();
		this.id = id;
		this.holidayName = holidayName;
		this.deleted = deleted;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getHolidayName() {
		return holidayName;
	}

	public void setHolidayName(String holidayName) {
		this.holidayName = holidayName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public Integer getID() {
		return this.id;
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
	

}
