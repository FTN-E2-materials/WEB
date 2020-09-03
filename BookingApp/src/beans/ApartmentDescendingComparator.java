package beans;

import java.util.Comparator;

public class ApartmentDescendingComparator implements Comparator<Apartment> {

	@Override
	public int compare(Apartment o1, Apartment o2) {
		return (int)(o2.getCostForNight() - o1.getCostForNight());
	}

}
