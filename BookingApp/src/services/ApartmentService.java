package services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import beans.ApartmentComment;
import beans.Grade;
import beans.Guest;
import beans.Reservation;
import dao.ApartmentDao;
import dao.ReservationDao;
import dao.UsersDao;
import dto.ApartmentDTO;
import dto.CommentDTO;
import dto.ReservationDTO;
import dto.SearchDTO;

public class ApartmentService {

	private ApartmentDao apartmentDao;
	private UsersDao userDao;
	private ReservationDao reservationDao;
	
	public ApartmentService(ApartmentDao apartmentDao, UsersDao userDao, ReservationDao reservationDao) {
		this.apartmentDao = apartmentDao;
		this.reservationDao = reservationDao;
		this.userDao = userDao;
	}
	
	public Apartment saveNewApartment(ApartmentDTO apartmentParameters) throws JsonSyntaxException, IOException {
		int nextID = apartmentDao.generateNextID();
		
		Apartment newApartment = new Apartment(apartmentParameters.getApartmentTitle(), apartmentParameters.getType(), apartmentParameters.getNumberOfRooms(), 
				apartmentParameters.getNumberOfGuests(), apartmentParameters.getLocation(), new ArrayList<ApartmentComment>(), 
				apartmentParameters.getCostForNight(), true, apartmentParameters.getCheckInTime(), apartmentParameters.getCheckOutTime(), apartmentParameters.getApartmentPictures());
		newApartment.setID(nextID);
		apartmentDao.save(newApartment);
		return newApartment;
	}
	
	public List<Apartment> getActive() throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) apartmentDao.getAll();
		ArrayList<Apartment> activeApartments = new ArrayList<Apartment>();
		for (Apartment a : apartments) {
			if (a.isActive()) {
				activeApartments.add(a);
			}
			
		}
		
		return activeApartments;
	}
	
	public Apartment getApartmentById(String id) throws JsonSyntaxException, IOException {
		return apartmentDao.getByID(Integer.parseInt(id));
	}
	
	public boolean checkIfReservedForDate(Date wantedDate) {
		return false;
	}
	
	public List<Apartment> getAllApartments() throws JsonSyntaxException, IOException {
		return apartmentDao.getAll();
	}
	
	public List<Apartment> getNewestApartments() throws JsonSyntaxException, IOException {
		return apartmentDao.getAll();
	}
	
	public List<Apartment> getMostPopularApartments() throws JsonSyntaxException, IOException {
		return apartmentDao.getAll();
	}
	
	public boolean reserveApartment(ReservationDTO reservation) {
		return false;
	}
	
	public void cancelReservation(Reservation reservation) {
	}
	
	public Apartment addComment(CommentDTO commentDTO) throws JsonSyntaxException, NumberFormatException, IOException {
		Apartment apartmentToComment = apartmentDao.getByID(Integer.parseInt(commentDTO.getApartment()));
		ApartmentComment comment = new ApartmentComment();
		if (commentDTO.getGrade().equals("Odlican")) {
			comment.setGrade(Grade.Excellent);
		} else if (commentDTO.getGrade().equals("Vrlo dobar")) {
			comment.setGrade(Grade.VeryGood);
		} else if (commentDTO.getGrade().equals("Dobar")) {
			comment.setGrade(Grade.Good);
		} else if (commentDTO.getGrade().equals("Dovoljan")) {
			comment.setGrade(Grade.Poor);
		} else {
			comment.setGrade(Grade.VeryPoor);
		}
		comment.setApartment(apartmentToComment.getID());
		comment.setGuest((Guest)userDao.getByID(commentDTO.getUsername()));
		comment.setText(commentDTO.getText());
		List<ApartmentComment> allComments = apartmentToComment.getComments();
		allComments.add(comment);
		apartmentToComment.setComments(allComments);
		apartmentDao.update(apartmentToComment);
		
		return apartmentToComment;
	}
	
	public boolean disableComments(Apartment apartment) {
		return false;
	}
	
	public boolean enableComments(Apartment apartment) {
		return false;
	}
	
	public List<Apartment> sortNewest() throws JsonSyntaxException, IOException {
		ArrayList<Apartment> allApartments = (ArrayList<Apartment>) apartmentDao.getAll();
		ArrayList<Apartment> sortedList = new ArrayList<Apartment>();
		
		return null;
	}
	
	public List<Apartment> sortOldest() {
		return null;
	}
	
	public List<Apartment> sortCheapest() {
		return null;
	}
	
	public List<Apartment> sortMostExpensive() {
		return null;
	}

	public List<Apartment> findAvailable(SearchDTO fromJson) {
		try {
			List<Apartment> filtered = filterApartments(fromJson);
			List<Apartment> retVal = new ArrayList<Apartment>();
			System.out.println(filtered.size());
			if (filtered.size() > 0) {

				Date startDate = new SimpleDateFormat("dd.MM.yyyy.").parse(fromJson.getDateFrom());
		    	Date endDate = new SimpleDateFormat("dd.MM.yyyy.").parse(fromJson.getDateTo());
		    	List<Reservation> reservationsByApartment = filterReservationsByApartments(filtered);
		    	List<Apartment> available = new ArrayList<Apartment>();
		    	for (Apartment a : filtered) {
		    		boolean addToList = false;
		    		for (Reservation r : reservationsByApartment) {
		    			if (r.getApartment().compareTo(a.getID())) {
		    				if (!r.isDateInIntersection(startDate, endDate)) {
		    					addToList = true;
		    				} else {
		    					System.out.println("asdsa");
		    					addToList = false;
		    				}
		    			}
		    			
		    			if (!addToList)
		    				break;
		    		}
		    		
		    		if (addToList) {
		    			retVal.add(a);
		    		}
		    	}
			}
			
			return retVal;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private List<Reservation> filterReservationsByApartments(List<Apartment> apartments) throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAll();
		List<Reservation> filtered = new ArrayList<Reservation>();


		for (Apartment a : apartments) {
			for (Reservation r : allReservations) {
				if(r.getApartment().compareTo(a.getID())) {
					filtered.add(r);
				}
			}
		}
		
		return filtered;
	}

	private List<Apartment> filterApartments(SearchDTO fromJson) throws JsonSyntaxException, IOException {
		List<Apartment> allApartments = apartmentDao.getAll();
		List<Apartment> filtered = new ArrayList<Apartment>();
		boolean addAp = false;
		for (Apartment a : allApartments) {
			addAp = false;
			if (fromJson.getLocation() != null) {
				if (fromJson.getLocation().toLowerCase().contains(a.getLocation().getAddress().getCity().getCity().toLowerCase())
						|| fromJson.getLocation().toLowerCase().contains(a.getLocation().getAddress().getCity().getState().getState().toLowerCase()) ) {
					addAp = true;
				} else {
					break;
				}
			}
			
			if (fromJson.getNumberOfGuests() != null) {
					if (Integer.parseInt(fromJson.getNumberOfGuests()) == a.getNumberOfGuests()) {
						addAp = true;
					} else {
						addAp = false;
					}
			}
			
			if (fromJson.getNumberOfRooms() != null) {
				if (Integer.parseInt(fromJson.getNumberOfRooms()) == a.getNumberOfRooms()) {
					addAp = true;
				} else {
					addAp = false;
				}
			}
			if (addAp) {
				filtered.add(a);
			}
		}
		
		return filtered;
	}

	private boolean isCompatible(Apartment a, SearchDTO fromJson) {
		return false;
	}
	
	private List<Reservation> filterReservationsFromToday(List<Reservation> allReservations) {
		List<Reservation> filtered = new ArrayList<Reservation>();
		Date today = new Date();
		for (Reservation r : allReservations) {
			if (r.getStartDate().compareTo(new Date(today.getTime() + 1000*60*60*24)) > 0) {
				filtered.add(r);
			}
		}
		return filtered;
	}
	
}
