package services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonSyntaxException;

import beans.Amenity;
import beans.Apartment;
import beans.ApartmentAscendingComparator;
import beans.ApartmentComment;
import beans.ApartmentDescendingComparator;
import beans.ApartmentType;
import beans.DestinationDescendingComparator;
import beans.Grade;
import beans.Guest;
import beans.Holiday;
import beans.Host;
import beans.Period;
import beans.Reservation;
import beans.ReservationAscendingComparator;
import beans.ReservationDescendingComparator;
//import beans.ReservationAscendingComparator;
//import beans.ReservationDescendingComparator;
import beans.ReservationStatus;
import beans.User;
import beans.UserRole;
import dao.ApartmentDao;
import dao.ReservationDao;
import dao.UsersDao;
import dto.ApartmentDTO;
import dto.CommentDTO;
import dto.DeleteCommentDTO;
import dto.DestinationDTO;
import dto.FilterDTO;
import dto.ReservationDTO;
import dto.SearchDTO;

public class ApartmentService {

	private ApartmentDao apartmentDao;
	private UsersDao userDao;
	private ReservationDao reservationDao;
	private Base64ToImage decoder = new Base64ToImage();
	private HolidayService holidayService;
	
	public ApartmentService(ApartmentDao apartmentDao, UsersDao userDao, ReservationDao reservationDao, HolidayService holidayService) {
		this.apartmentDao = apartmentDao;
		this.reservationDao = reservationDao;
		this.userDao = userDao;
		this.holidayService = holidayService;
	}
	
	public Apartment saveNewApartment(ApartmentDTO apartmentParameters, Host host) throws JsonSyntaxException, IOException, ParseException {
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
		newApartment.setHostUsername(host.getUsername());
		newApartment.setCommentsEnabled(apartmentParameters.isCommentsEnabled());
		newApartment.setCostCurrency(apartmentParameters.getCurrency());
		newApartment.setAmenities(apartmentParameters.getAmenities());
		
		List<Period> periods = newApartment.getPeriodsForRent();
		
		Period p = new Period();
		
		System.out.println(apartmentParameters.getStartDate());
		if (!apartmentParameters.getStartDate().isEmpty()) {
			p.setStartDate(new SimpleDateFormat("yyyy-mm-dd").parse(apartmentParameters.getStartDate()));
		} 
		

		if (!apartmentParameters.getEndDate().isEmpty()) {
			p.setEndDate(new SimpleDateFormat("yyyy-mm-dd").parse(apartmentParameters.getEndDate()));
		} 
		
		
		periods.add(p);
		newApartment.setPeriodsForRent(periods);
		
		apartmentDao.save(newApartment);
		host.addApartmentForRent(newApartment);
		userDao.update(host);
		
		return newApartment;
	}
	
	public List<Apartment> getActive() throws JsonSyntaxException, IOException {
		ArrayList<Apartment> apartments = (ArrayList<Apartment>) apartmentDao.getAllNonDeleted();
		ArrayList<Apartment> activeApartments = new ArrayList<Apartment>();
		for (Apartment a : apartments) {
			Host h = (Host) userDao.getByID(a.getHostUsername());
			if (a.isActive() && !h.isBlocked()) {
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
		return apartmentDao.getAllNonDeleted();
	}
	
	public List<Apartment> getApartmentsByCity(String city) throws JsonSyntaxException, IOException {
		List<Apartment> apartments = apartmentDao.getAllNonDeleted();
		List<Apartment> filtered = new ArrayList<Apartment>();
		
		for (Apartment a : apartments) {
			Host h = (Host) userDao.getByID(a.getHostUsername());
			if (a.isActive() && !h.isBlocked()) {
				if (a.getLocation().getAddress().getCity().getCity().toLowerCase().contains(city)) {
					filtered.add(a);
				}
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

	public Reservation reserveApartment(ReservationDTO reservation, Guest guest) throws ParseException, JsonSyntaxException, IOException {
		Date startDate = null;
		if (reservation.getStartDate() != null) {
			startDate = new SimpleDateFormat("dd.MM.yyyy.").parse(reservation.getStartDate());
		} 
		
		Date endDate = new Date(startDate.getTime() + reservation.getNumberOfNights()*24*60*60*1000);
		boolean flag = true;
		if (reservation.getApartment().isValidPeriod(startDate, endDate)) {

			for (Reservation r : reservationDao.getAllNonDeleted()) {
				if (r.getApartment().compareTo(reservation.getApartment().getID())) {
					if (r.isDateInIntersection(startDate, endDate)) {
						flag = false;
					}
				}
			}
		} else {
			flag = false;
		}
		
		if (flag) {
			Reservation r = new Reservation(reservation.getApartment(), startDate, reservation.getNumberOfNights(), 
					reservation.getApartment().getCostForNight()*reservation.getNumberOfNights(),
					reservation.getMessage(), guest, ReservationStatus.Created);
			r.setID(reservationDao.generateNextID());
			if (checkIfHoliday(startDate, endDate)) {
				double newPrice = r.getCost();
				newPrice = newPrice + newPrice*0.05;
				r.setCost(newPrice);
			} else if (checkIfWeekend(startDate, endDate)) {
				double newPrice = r.getCost();
				newPrice = newPrice - newPrice*0.1;
				r.setCost(newPrice);
			}
			
			Reservation r1 = new Reservation();
			r1.setID(r.getID());
			guest.addReservation(r1);
			
			userDao.update(guest);
			reservationDao.create(r);
			return r;
		}
		
		return null;
	}
	
	private boolean checkIfWeekend(java.util.Date startDate, java.util.Date endDate) {
		Date nextDate = startDate;
		while(nextDate.compareTo(endDate) <= 0) {
			if (nextDate.getDay() == 6) {
				return true;
			} else if (nextDate.getDay() == 7) {
				return true;
			} else if (nextDate.getDay() == 1) {
				return true;
			}
			nextDate = new Date(nextDate.getTime() + 24*60*60*1000);
		}
		return false;
	}

	private boolean checkIfHoliday(Date startDate, Date endDate) throws JsonSyntaxException, IOException {
		for (Holiday h : holidayService.getAllHolidays()) {
			Date nextDate = startDate;
			while(nextDate.compareTo(endDate) <= 0) {
				if (nextDate.compareTo(h.getDate()) == 0) {
					return true;
				}
				nextDate = new Date(nextDate.getTime() + 24*60*60*1000);
			}
		}
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
		comment.setId(apartmentToComment.getComments().size() + 1);
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
			System.out.println("dasdas");
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
		System.out.println("hostUsernamedomacin1");
		List<Apartment> filtered = new ArrayList<Apartment>();
		boolean addAp = false;
		for (Apartment a : allApartments) {
			Host h = (Host) userDao.getByID(a.getHostUsername());
			if (a.isActive() && !h.isBlocked()) {
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
				
				if (fromJson.getCost() != 0) {
					if (a.translateCostToSameCurrency() <= fromJson.getCost()) {
						addAp = true;
					} else {
						addAp = false;
					}
				}
				if (addAp) {
					filtered.add(a);
				}
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
			System.out.println(filteredByUser.size());
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
			
			if (accepted == ReservationStatus.Accepted) {
				Guest g = (Guest) userDao.getByID(reservationtForChange.getGuest().getID());
				g.addAparment(reservationtForChange.getApartment());
				userDao.update(g);
			}
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

	public List<Apartment> getActiveForHost(User host) throws JsonSyntaxException, IOException {
		if (host.getRole() != UserRole.Host) {
			return null;
		}
		Host hostToGet = (Host) host;
		List<Apartment> retVal = new ArrayList<Apartment>();
		for (Apartment a : hostToGet.getForRent()) {
			System.out.println(a.getID());
			Apartment a1 = apartmentDao.getByID(a.getID());
			if (a1 != null) {
				if (a1.isActive()) {
					retVal.add(a1);
				}
			}
		}
		return retVal;
	}

	public List<Apartment>  getInactiveForHost(User host) throws JsonSyntaxException, IOException {
		if (host.getRole() != UserRole.Host) {
			return null;
		}
		Host hostToGet = (Host) host;
		List<Apartment> retVal = new ArrayList<Apartment>();
		for (Apartment a : hostToGet.getForRent()) {
			Apartment a1 = apartmentDao.getByID(a.getID());
			if (a1 != null) {
				if (!a1.isActive()) {
					retVal.add(a1);
				}
			}
		}
		return retVal;
	}

	public Apartment updateApartment(ApartmentDTO apartmentParameters, Host host) throws FileNotFoundException, IOException, ParseException {
		List<String> convertedImages = new ArrayList<String>();
		int i = 1;
		for (String s : apartmentParameters.getApartmentPictures()) {
			++i;
			if (s.startsWith("data:image")) {
				String path = "images/apartments/a" + apartmentParameters.getId() + i + ".jpg";
				System.out.println(path);
				decoder.Base64DecodeAndSave(s, path);
				path = "./" + "images/apartments/a" + apartmentParameters.getId() + i + ".jpg"; 
				convertedImages.add(path);
			} else {
				convertedImages.add(s);
			}
		}
		
		Apartment newApartment = new Apartment(apartmentParameters.getApartmentTitle(), apartmentParameters.getType(), apartmentParameters.getNumberOfRooms(), 
				apartmentParameters.getNumberOfGuests(), apartmentParameters.getLocation(), new ArrayList<ApartmentComment>(), 
				apartmentParameters.getCostForNight(), true, apartmentParameters.getCheckInTime(), apartmentParameters.getCheckOutTime(), convertedImages);
		newApartment.setID(apartmentParameters.getId());
		newApartment.setCommentsEnabled(apartmentParameters.isCommentsEnabled());
		newApartment.setCostCurrency(apartmentParameters.getCurrency());
		newApartment.setAmenities(apartmentParameters.getAmenities());
		newApartment.setHostUsername(host.getUsername());
		List<Period> periods = apartmentDao.getByID(apartmentParameters.getId()).getPeriodsForRent();

		Period p = new Period();
		
		if (!apartmentParameters.getStartDate().isEmpty()) {
			p.setStartDate(new SimpleDateFormat("dd.MM.yyyy.").parse(apartmentParameters.getStartDate()));
		} 
		

		if (!apartmentParameters.getEndDate().isEmpty()) {
			p.setEndDate(new SimpleDateFormat("dd.MM.yyyy.").parse(apartmentParameters.getEndDate()));
		} 
		
		
		periods.add(p);
		newApartment.setPeriodsForRent(periods);
		
		apartmentDao.update(newApartment);
		
		host.updateRentApartments(newApartment);
		
		userDao.update(host);
		
		return newApartment;
	}

	public void deleteAparmtent(String params) throws JsonSyntaxException, NumberFormatException, IOException {
		apartmentDao.delete(apartmentDao.getByID(Integer.parseInt(params)));
	}

	public Apartment deleteComment(DeleteCommentDTO fromJson) throws JsonSyntaxException, IOException {
		Apartment a = apartmentDao.getByID(fromJson.getApId());
		List<ApartmentComment> comments = a.getComments();
		
		for (ApartmentComment c : comments) {
			if (c.getId() == fromJson.getCommentId()) {
				c.setHidden(true);
				break;
			}
		}
		
		a.setComments(comments);
		apartmentDao.update(a);
		return a;
	}

	public Apartment showComment(DeleteCommentDTO fromJson) throws JsonSyntaxException, IOException {
		Apartment a = apartmentDao.getByID(fromJson.getApId());
		List<ApartmentComment> comments = a.getComments();
		
		for (ApartmentComment c : comments) {
			if (c.getId() == fromJson.getCommentId()) {
				c.setHidden(false);
				break;
			}
		}
		
		a.setComments(comments);
		apartmentDao.update(a);
		return a;
	}

	public List<Apartment> filterByAmenity(FilterDTO fromJson) throws JsonSyntaxException, IOException {
		List<Amenity> amenities = fromJson.getList();
		List<Apartment> filtered = new ArrayList<Apartment>();
		ApartmentType type = null;
		if (fromJson.getType() != null) {
			if (!fromJson.getType().isEmpty()) {
				if (fromJson.getType().equals("soba")) {
					type = ApartmentType.Room;
				} else {
					type = ApartmentType.FullApartment;
				}
			}
		}
		
		for (Apartment a : getActive())  {
			boolean flagToAdd = true;
			for (Amenity am : amenities) {
				if (!a.doIHaveAmenity(am)) {
					flagToAdd = false;
					break;
				}
			}
			
			if (flagToAdd) {
				if (type != null) {
					if (a.getType() == type) {
						filtered.add(a);
					}
				} else {
					filtered.add(a);
					System.out.println("aa");
				}
			}
 		}
		
		if (fromJson.isAscending()) {
			Collections.sort(filtered, new ApartmentAscendingComparator());
		} else if (fromJson.isDescending()) {
			Collections.sort(filtered, new ApartmentDescendingComparator());
		}
		
		System.out.println(filtered.size());
		return filtered;
	}

	public List<Apartment> filterByAmenityForAdmin(FilterDTO fromJson) throws JsonSyntaxException, IOException {

		List<Amenity> amenities = fromJson.getList();
		List<Apartment> filtered = new ArrayList<Apartment>();
		ApartmentType type = null;
		if (fromJson.getType() != null) {
			if (!fromJson.getType().isEmpty()) {
				if (fromJson.getType().equals("soba")) {
					type = ApartmentType.Room;
				} else {
					type = ApartmentType.FullApartment;
				}
			}
		}
		
		for (Apartment a : apartmentDao.getAllNonDeleted())  {
			boolean flagToAdd = true;
			for (Amenity am : amenities) {
				if (!a.doIHaveAmenity(am)) {
					flagToAdd = false;
					break;
				}
			}
			
			if (flagToAdd) {
				if (type != null) {
					if (a.getType() == type) {
						filtered.add(a);
					}
				} else {
					filtered.add(a);
					System.out.println("aa");
				}
			}
 		}
		
		if (fromJson.isAscending()) {
			Collections.sort(filtered, new ApartmentAscendingComparator());
		} else if (fromJson.isDescending()) {
			Collections.sort(filtered, new ApartmentDescendingComparator());
		}
		
		System.out.println(filtered.size());
		return filtered;
	}

	public List<Apartment> filterForHost(FilterDTO fromJson, Host host) throws JsonSyntaxException, IOException {

		List<Amenity> amenities = fromJson.getList();
		List<Apartment> filtered = new ArrayList<Apartment>();
		ApartmentType type = null;
		if (fromJson.getType() != null) {
			if (!fromJson.getType().isEmpty()) {
				if (fromJson.getType().equals("soba")) {
					type = ApartmentType.Room;
				} else {
					type = ApartmentType.FullApartment;
				}
			}
		}
		
		for (Apartment a : getActiveForHost(host))  {
			boolean flagToAdd = true;
			for (Amenity am : amenities) {
				if (!a.doIHaveAmenity(am)) {
					flagToAdd = false;
					break;
				}
			}
			
			if (flagToAdd) {
				if (type != null) {
					if (a.getType() == type) {
						filtered.add(a);
					}
				} else {
					filtered.add(a);
					System.out.println("aa");
				}
			}
 		}
		
		if (fromJson.isAscending()) {
			Collections.sort(filtered, new ApartmentAscendingComparator());
		} else if (fromJson.isDescending()) {
			Collections.sort(filtered, new ApartmentDescendingComparator());
		}
		
		System.out.println(filtered.size());
		return filtered;
	}

	public List<Apartment> deactivateApartment(String params, Host h) throws JsonSyntaxException, IOException {
		Apartment a = apartmentDao.getByID(Integer.parseInt(params));
		a.setActive(false);
		apartmentDao.update(a);
		return getActiveForHost(h);
	}

	public List<Apartment> activateApartment(String params, Host h) throws JsonSyntaxException, IOException {
		Apartment a = apartmentDao.getByID(Integer.parseInt(params));
		a.setActive(true);
		apartmentDao.update(a);
		return getInactiveForHost(h);
	}

	public List<Reservation> getReservationsForAdmin() throws JsonSyntaxException, IOException {
		return reservationDao.getAllNonDeleted();
	}

	public List<Reservation> filterReservations(FilterDTO fromJson, User u) throws JsonSyntaxException, IOException {
		List<Reservation> reservations = new ArrayList<Reservation>();
		List<Reservation> retVal = new ArrayList<Reservation>();
		
		if (u.getRole() == UserRole.Administrator) {
			reservations = this.getReservationsForAdmin();
		} else {
			reservations = this.getReservationsByUser(u.getUsername());
		}
		
		for (Reservation r : reservations) {
			boolean flag = true;
			for (ReservationStatus status : fromJson.getStatus()) {
				if ((r.getStatus() == status)) {
					retVal.add(r);
				}
				
			}
			System.out.println("asdsa" + fromJson.getStatus().size());
			
		}
		
		if (fromJson.isAscending()) {
			Collections.sort(retVal, new ReservationAscendingComparator());
		} else if (fromJson.isDescending()) {
			Collections.sort(retVal, new ReservationDescendingComparator());
		}
		return retVal;
	}
	
	public boolean canIComment(String id, Guest g) throws JsonSyntaxException, IOException {
		Apartment a = apartmentDao.getByID(Integer.parseInt(id));
		for (Reservation r : reservationDao.getAllNonDeleted()) {
			if (r.getApartment().compareTo(a.getID()) && r.getGuest().compareTo(g.getID())) {
				if (r.getStatus() == ReservationStatus.Accepted || r.getStatus() == ReservationStatus.Finished) {
					return true;
				}
			}
			
		}
		return false;
	}

	public List<User> getGuestsForHost(Host h) throws JsonSyntaxException, IOException {
		List<User> retVal = new ArrayList<User>();
		for (Reservation r : this.getReservationsByUser(h.getID())) {
			boolean flag = true;
			for (User u : retVal) {
			
				if (u.compareTo(r.getGuest().getUsername())) {
					flag = false;
					break;
				}
			}
			if (flag) {
				if (!retVal.contains(r.getGuest())) {
					retVal.add(userDao.getByID(r.getGuest().getID()));
				}
			}
		}
		return retVal;
	}

	public List<Apartment> filterSearched(FilterDTO fromJson) throws JsonSyntaxException, IOException {
		List<Amenity> amenities = fromJson.getList();
		List<Apartment> filtered = new ArrayList<Apartment>();
		ApartmentType type = null;
		if (fromJson.getType() != null) {
			if (!fromJson.getType().isEmpty()) {
				if (fromJson.getType().equals("soba")) {
					type = ApartmentType.Room;
				} else {
					type = ApartmentType.FullApartment;
				}
			}
		}
		System.out.println(fromJson.getApartments().size());
		System.out.println(fromJson.getApartments().size());
		for (String s : fromJson.getApartments())  {
			boolean flagToAdd = true;
			Apartment a = apartmentDao.getByID(Integer.parseInt(s));
			for (Amenity am : amenities) {
				if (!a.doIHaveAmenity(am)) {
					flagToAdd = false;
					break;
				}
			}
			
			if (flagToAdd) {
				if (type != null) {
					if (a.getType() == type) {
						filtered.add(a);
					}
				} else {
					filtered.add(a);
					System.out.println("aa");
				}
			}
 		}
		
		if (fromJson.isAscending()) {
			Collections.sort(filtered, new ApartmentAscendingComparator());
		} else if (fromJson.isDescending()) {
			Collections.sort(filtered, new ApartmentDescendingComparator());
		}
		
		System.out.println(filtered.size());
		System.out.println(filtered.size());
		System.out.println(filtered.size());
		return filtered;
	}
}
