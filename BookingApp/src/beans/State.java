package beans;

public class State implements IIdentifiable<Integer> {
	private String state;
	private int id;
	private boolean deleted;
	
	public State(String state) {
		this.state = state;
		this.deleted = false;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
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
