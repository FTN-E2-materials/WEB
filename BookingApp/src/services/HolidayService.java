package services;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import com.google.gson.JsonSyntaxException;

import beans.Holiday;
import dao.HolidayDao;
import dto.HolidayDTO;

public class HolidayService {
	private HolidayDao holidayDao;
	
	public HolidayService(HolidayDao holidayDao) {
		this.holidayDao = holidayDao;
	}
	
	public Holiday addHoliday(HolidayDTO holiday) throws JsonSyntaxException, IOException, ParseException {
		Holiday h = new Holiday();
		h.setDate(new SimpleDateFormat("yyyy-mm-dd").parse(holiday.getDate()));
		h.setHolidayName(holiday.getHolidayName());
		h.setID(this.holidayDao.generateNextID());
		return holidayDao.create(h);
	}
	
	public boolean deleteHoliday(String id) throws JsonSyntaxException, IOException {

		Holiday h = holidayDao.getByID(Integer.parseInt(id));
		return holidayDao.delete(h);
	}
	
	public Holiday updateHoliday(HolidayDTO holiday) throws JsonSyntaxException, IOException, ParseException {
		System.out.println(holiday.getId());
		Holiday h = holidayDao.getByID(holiday.getId());
		if(holiday.getDate() != null) {
			if (!holiday.getDate().isEmpty()) {
				h.setDate(new SimpleDateFormat("yyyy-mm-dd").parse(holiday.getDate()));
			}
		}
		
		if (holiday.getHolidayName() != null) {
			if (!holiday.getHolidayName().isEmpty()) {
				h.setHolidayName(holiday.getHolidayName());
			}
		}
		return holidayDao.update(h);
	}

	public List<Holiday> getAllHolidays() throws JsonSyntaxException, IOException {
		return holidayDao.getAllNonDeleted();
	}
}
