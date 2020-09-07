package beans;

import java.util.Comparator;

import dto.DestinationDTO;

public class DestinationDescendingComparator implements Comparator<DestinationDTO> {

	@Override
	public int compare(DestinationDTO o1, DestinationDTO o2) {
		return (int)(o2.getCount() - o1.getCount());
		
	}}
