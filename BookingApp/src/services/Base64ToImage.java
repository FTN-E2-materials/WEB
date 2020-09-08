package services;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

public class Base64ToImage {
	
	public void Base64DecodeAndSave(String base64String, String imagePath) throws FileNotFoundException, IOException {
		String part[] = base64String.split(",");
		String path = "./static/" + imagePath;
		
		byte[] data = Base64.getDecoder().decode(part[1]);
		
		System.out.println(part[1]);
		try (OutputStream stream = new FileOutputStream(path)) {
		    stream.write(data);
		}
	}
}
