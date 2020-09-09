package dto;

public class DeleteCommentDTO {
	private int apId;
	private int commentId;
	
	public DeleteCommentDTO() {
		// TODO Auto-generated constructor stub
	}

	public DeleteCommentDTO(int apId, int commentId) {
		super();
		this.apId = apId;
		this.commentId = commentId;
	}

	public int getApId() {
		return apId;
	}

	public void setApId(int apId) {
		this.apId = apId;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	

}
