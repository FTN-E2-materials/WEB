package beans;

import java.util.Comparator;

public class ApartmentAscendingComparator implements Comparator<Apartment> {

	@Override
	public int compare(Apartment o1, Apartment o2) {
		return (int)(o1.getCostForNight() - o2.getCostForNight());
	}

}
