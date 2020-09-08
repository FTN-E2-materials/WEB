package beans;

import java.util.Date;

public class Period {
	private Date startDate;
	private Date endDate;
	
	public Period() {
		// TODO Auto-generated constructor stub
	}
	
	public Period(Date startDate, Date endDate) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
	}



	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	

}
