package controllers;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import beans.Holiday;
import dto.HolidayDTO;
import services.HolidayService;

public class HolidayController {
	private HolidayService holidayService;
	private static Gson gs = new Gson();
	
	public HolidayController(HolidayService holidayService) {
		this.holidayService = holidayService;
		
		put("holiday/addHoliday", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(holidayService.addHoliday(gs.fromJson(req.body(), HolidayDTO.class)));
			} catch(Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		delete("holiday/deleteHoliday/:id", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(holidayService.deleteHoliday(req.params("id")));
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		post("holiday/updateHoliday", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(holidayService.updateHoliday(gs.fromJson(req.body(), HolidayDTO.class)));
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
		});
		
		get("holiday/getAll", (req, res) -> {
			res.type("application/json");
			try {
				return gs.toJson(holidayService.getAllHolidays());
			} catch (Exception e) {
				e.printStackTrace();
				return Response.status(500).build();
			}
			
		});
	}
}
