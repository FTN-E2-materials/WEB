package beans;

import java.util.Comparator;

public class ApartmentDescendingComparator implements Comparator<Apartment> {

	@Override
	public int compare(Apartment o1, Apartment o2) {
		if (o2.getCostCurrency() == o1.getCostCurrency()) {
			return (int)(o2.getCostForNight() - o1.getCostForNight());
		} else {
			return (int)(o2.translateCostToSameCurrency() - o1.translateCostToSameCurrency());
		}
	}

}
