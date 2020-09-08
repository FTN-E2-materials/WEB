package services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonSyntaxException;

import beans.Apartment;
import beans.ApartmentAscendingComparator;
import beans.ApartmentComment;
import beans.ApartmentDescendingComparator;
import beans.DestinationDescendingComparator;
import beans.Grade;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.ReservationStatus;
import beans.User;
import beans.UserRole;
import dao.ApartmentDao;
import dao.ReservationDao;
import dao.UsersDao;
import dto.ApartmentDTO;
import dto.CommentDTO;
import dto.DestinationDTO;
import dto.ReservationDTO;
import dto.SearchDTO;

public class ApartmentService {

	private ApartmentDao apartmentDao;
	private UsersDao userDao;
	private ReservationDao reservationDao;
	private Base64ToImage decoder = new Base64ToImage();
	
	public ApartmentService(ApartmentDao apartmentDao, UsersDao userDao, ReservationDao reservationDao) {
		this.apartmentDao = apartmentDao;
		this.reservationDao = reservationDao;
		this.userDao = userDao;
	}
	
	public Apartment saveNewApartment(ApartmentDTO apartmentParameters, Host host) throws JsonSyntaxException, IOException {
		int nextID = apartmentDao.generateNextID();
		
		List<String> convertedImages = new ArrayList<String>();
		int i = 1;
		for (String s : apartmentParameters.getApartmentPictures()) {
			String path = "images/apartments/a" + nextID + i + ".jpg";
			System.out.println(path);
			decoder.Base64DecodeAndSave(s, path);
			path = "./" + "images/apartments/a" + nextID + i + ".jpg"; 
			convertedImages.add(path);
			++i;
		}
		
		Apartment newApartment = new Apartment(apartmentParameters.getApartmentTitle(), apartmentParameters.getType(), apartmentParameters.getNumberOfRooms(), 
				apartmentParameters.getNumberOfGuests(), apartmentParameters.getLocation(), new ArrayList<ApartmentComment>(), 
				apartmentParameters.getCostForNight(), true, apartmentParameters.getCheckInTime(), apartmentParameters.getCheckOutTime(), convertedImages);
		newApartment.setID(nextID);
		newApartment.setCostCurrency(apartmentParameters.getCurrency());
		newApartment.setAmenities(apartmentParameters.getAmenities());
		apartmentDao.save(newApartment);
		host.addApartmentForRent(newApartment);
		userDao.update(host);
		return newApartment;
	}
	
	public List<Apartment> getActive() throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) apartmentDao.getAllNonDeleted();
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
	
	public List<Apartment> getApartmentsByCity(String city) throws JsonSyntaxException, IOException {
		List<Apartment> apartments = apartmentDao.getAll();
		List<Apartment> filtered = new ArrayList<Apartment>();
		
		for (Apartment a : apartments) {
			if (a.getLocation().getAddress().getCity().getCity().toLowerCase().contains(city)) {
				filtered.add(a);
			}
		}
		return filtered;
	}
	
	public List<DestinationDTO> getMostPopularDestinations() throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAllNonDeleted();
		List<DestinationDTO> destinations = new ArrayList<DestinationDTO>();
		
		for (Reservation r : allReservations) {
			String path = generateImagePathForDestination(r.getApartment().getLocation().getAddress().getCity().getCity());
			if (path.equals("")) {
				path = r.getApartment().getApartmentPictures().size() == 0 ? "" : r.getApartment().getApartmentPictures().get(0);
			}
			DestinationDTO d = new DestinationDTO(r.getApartment().getLocation().getAddress().getCity().getCity(), path);
			if (destinations.contains(d)) {
				int i = destinations.indexOf(d);
				DestinationDTO d1 = destinations.get(i);
				d1.setCount(d.getCount() + 1);
				destinations.set(i, d1);
			} else {
				destinations.add(d);
			}
		}
		System.out.println(destinations.size());
		if (destinations.size() == 0) {
			List<Apartment> apartments = apartmentDao.getAllNonDeleted();
			for (Apartment a : apartments) {
				String path = generateImagePathForDestination(a.getLocation().getAddress().getCity().getCity());
				if (path.equals("")) {
					path = a.getApartmentPictures().size() == 0 ? "" : a.getApartmentPictures().get(0);
				}
				DestinationDTO d = new DestinationDTO(a.getLocation().getAddress().getCity().getCity(), path);
				if (destinations.contains(d)) {
					int i = destinations.indexOf(d);
					DestinationDTO d1 = destinations.get(i);
					d1.setCount(d.getCount() + 1);
					destinations.set(i, d1);
				} else {
					destinations.add(d);
				}
			}
		}
		destinations.sort(new DestinationDescendingComparator());
		return destinations;
	}
	
	private String generateImagePathForDestination(String city) {
		if (city.toLowerCase().equals("kikinda")) {
			return "images/Kikinda.jpg";
		} else if (city.toLowerCase().equals("subotica")) {
			return "images/Subotica.jpg";
		} else if (city.toLowerCase().equals("novi sad")) {
			return "images/NoviSad.jpg";
		} else if (city.toLowerCase().equals("zlatibor")) {
			return "images/Zlatibor.jpg";
		} else if (city.toLowerCase().equals("kopaonik")) {
			return "images/Kopaonik.jpg";
		} else {
			return "";
		}
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
	
	public boolean disableComments(Apartment apartment) throws JsonSyntaxException, IOException {
		apartment.setCommentsEnabled(false);
		apartmentDao.update(apartment);
		return true;
	}
	
	public boolean enableComments(Apartment apartment) throws JsonSyntaxException, IOException {
		apartment.setCommentsEnabled(true);
		apartmentDao.update(apartment);
		return true;
	}
	
	public List<Apartment> sortNewest() throws JsonSyntaxException, IOException {
		ArrayList<Apartment> allApartments = (ArrayList<Apartment>) apartmentDao.getAllNonDeleted();
		ArrayList<Apartment> sortedList = new ArrayList<Apartment>();
		
		return null;
	}
	
	public List<Apartment> sortOldest() {
		return null;
	}
	
	public List<Apartment> sortCheapest() throws JsonSyntaxException, IOException {
		List<Apartment> apartments = getActive();
		Collections.sort(apartments, new ApartmentAscendingComparator());
		return apartments;
	}
	
	public List<Apartment> sortMostExpensive() throws JsonSyntaxException, IOException {
		List<Apartment> apartments = getActive();
		Collections.sort(apartments, new ApartmentDescendingComparator());
		return apartments;
	}

	public List<Apartment> findAvailable(SearchDTO fromJson) {
		try {
			List<Apartment> filtered = filterApartments(fromJson);
			List<Apartment> retVal = new ArrayList<Apartment>();
			System.out.println(filtered.size());
			if (filtered.size() > 0) {

				Date startDate = null;
				
				if (fromJson.getDateFrom() != null) {
					startDate = new SimpleDateFormat("dd.MM.yyyy.").parse(fromJson.getDateFrom());
				} 				
			
				Date endDate = null;
				if (fromJson.getDateFrom() != null) {
					endDate = new SimpleDateFormat("dd.MM.yyyy.").parse(fromJson.getDateTo());
				} 

		    	List<Reservation> reservationsByApartment = filterReservationsByApartments(filtered);
		    	List<Apartment> available = new ArrayList<Apartment>();
		    	
		    	if (endDate != null && startDate != null) {
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
		    	} else {
		    		retVal = filtered;
		    	}
			}
			
			return retVal;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private List<Reservation> filterReservationsByApartments(List<Apartment> apartments) throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAllNonDeleted();
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
		List<Apartment> allApartments = apartmentDao.getAllNonDeleted();
		List<Apartment> filtered = new ArrayList<Apartment>();
		boolean addAp = false;
		for (Apartment a : allApartments) {
			addAp = false;
			if (!fromJson.getLocation().isEmpty()) {
				if (fromJson.getLocation().toLowerCase().contains(a.getLocation().getAddress().getCity().getCity().toLowerCase())
						|| fromJson.getLocation().toLowerCase().contains(a.getLocation().getAddress().getCity().getState().getState().toLowerCase()) ) {
					addAp = true;
				} else {
					break;
				}
			}
			
			if (!fromJson.getNumberOfGuests().isEmpty()) {
					if (Integer.parseInt(fromJson.getNumberOfGuests()) == a.getNumberOfGuests()) {
						addAp = true;
					} else {
						addAp = false;
					}
			}
			
			if (!fromJson.getNumberOfRooms().isEmpty()) {
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
	
	public List<Reservation> getReservationsByStatus(ReservationStatus status) throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAllNonDeleted();
		List<Reservation> retVal = new ArrayList<Reservation>();
		
		for (Reservation r : allReservations) {
			if (r.getStatus().toString().equals(status.toString())) {
				retVal.add(r);
			}
		}
		return null;
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
	
	public List<Apartment> testSorting() {
		Apartment a1 = new Apartment();
		a1.setCostForNight(50);
		Apartment a2 = new Apartment();
		a2.setCostForNight(530);
		Apartment a3 = new Apartment();
		a3.setCostForNight(505);
		Apartment a4 = new Apartment();
		a4.setCostForNight(12);
		Apartment a5 = new Apartment();
		a5.setCostForNight(4);
		Apartment a6 = new Apartment();
		a6.setCostForNight(542);
		Apartment a7 = new Apartment();
		a7.setCostForNight(508);
		Apartment a8 = new Apartment();
		a8.setCostForNight(501);
		List<Apartment> collection = new ArrayList<Apartment>();
		collection.add(a1);
		collection.add(a2);
		collection.add(a3);
		collection.add(a4);
		collection.add(a5);
		collection.add(a6);
		collection.add(a7);
		collection.add(a8);
		
		Collections.sort(collection, new ApartmentAscendingComparator());
		
		for (Apartment a : collection) {
			System.out.println(a.getCostForNight() + " ");
		}
		
		Collections.sort(collection, new ApartmentDescendingComparator());
		
		for (Apartment a : collection) {
			System.out.println(a.getCostForNight() + " ");
		}
		return null;
	}

	public List<Reservation> getReservationsByUser(String params) throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAllNonDeleted();
		List<Reservation> filteredByUser = new ArrayList<Reservation>();
		User user = userDao.getByID(params);
		
		if (user == null) {
			return null;
		}
		
		if (user.getRole() == UserRole.Host) {
			Host host = (Host) user;
			for (Reservation r : allReservations) {
				if (host.isApartmentMine(r.getApartment())) {
					filteredByUser.add(r);
				}
			}
			
			return filteredByUser;
		} else if (user.getRole() == UserRole.Guest) {
			Guest guest = (Guest) user;
			for (Reservation r : allReservations) {
				if (r.getGuest().getUsername().equals(guest.getUsername())) {
					filteredByUser.add(r);
				}
			}
			return filteredByUser;
		} else {
			return allReservations;
		}
	}

	public Reservation updateReservationStatus(String params, ReservationStatus accepted) throws JsonSyntaxException, NumberFormatException, IOException {
		Reservation reservationtForChange = reservationDao.getByID(Integer.parseInt(params));
		if (reservationtForChange != null) {
			reservationtForChange.setStatus(accepted);
			reservationDao.update(reservationtForChange);
			return reservationtForChange;
		}
		return null;
		
	}

	public List<Reservation> getReservationsForApartment(String params) throws JsonSyntaxException, IOException {
		List<Reservation> allReservations = reservationDao.getAllNonDeleted();
		int apartmentID = Integer.parseInt(params);
		List<Reservation> filteredByApartment = new ArrayList<Reservation>();
		
		for (Reservation r : allReservations) {
			if (r.getApartment().compareTo(apartmentID)) {
				filteredByApartment.add(r);
			}
		}
		return filteredByApartment;
	}

	public List<Apartment> getActiveForHost(User host) {
		if (host.getRole() != UserRole.Host) {
			return null;
		}
		Host hostToGet = (Host) host;
		List<Apartment> retVal = new ArrayList<Apartment>();
		for (Apartment a : hostToGet.getForRent()) {
			if (a.isActive()) {
				retVal.add(a);
			}
		}
		return retVal;
	}

	public List<Apartment>  getInactiveForHost(User host) {
		if (host.getRole() != UserRole.Host) {
			return null;
		}
		Host hostToGet = (Host) host;
		List<Apartment> retVal = new ArrayList<Apartment>();
		for (Apartment a : hostToGet.getForRent()) {
			if (!a.isActive()) {
				retVal.add(a);
			}
		}
		return retVal;
	}
}
