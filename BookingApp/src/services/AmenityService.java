package services;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;

import beans.Amenity;
import dao.AmenityDao;

public class AmenityService {
	private AmenityDao amenityDao;
	
	public AmenityService(AmenityDao amenityDao) {
		this.amenityDao = amenityDao;
	}


	public List<Amenity> getAllAmenities() throws JsonSyntaxException, IOException {
		return amenityDao.getAllNonDeleted();
	}


	public void editAmenity(Amenity fromJson) throws JsonSyntaxException, IOException {
		amenityDao.update(fromJson);
	}


	public void deleteAmenity(String fromJson) throws JsonSyntaxException, NumberFormatException, IOException {
		Amenity forDelete = amenityDao.getByID(Integer.parseInt(fromJson));
		amenityDao.delete(forDelete);
	}


	public void addAmenity(String name) throws JsonSyntaxException, IOException {
		Amenity a = new Amenity();
		a.setAmenityName(name);
		a.setId(amenityDao.generateNextID());
		amenityDao.create(a);
	}
}
