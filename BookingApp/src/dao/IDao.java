package dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;

public interface IDao<T, ID> {
	List<T> getAll() throws JsonSyntaxException, IOException;
	List<T> getAllNonDeleted() throws JsonSyntaxException, IOException;
	T getByID(ID id) throws JsonSyntaxException, IOException;
	T create(T entity) throws JsonSyntaxException, IOException;
	T update(T entity) throws JsonSyntaxException, IOException;
	boolean delete(T entity) throws JsonSyntaxException, IOException;
	void save(T entity) throws JsonSyntaxException, IOException;
	void saveAll(List<T> entities) throws FileNotFoundException;
	
}
