package beans;

import java.util.Comparator;

public class ApartmentAscendingComparator implements Comparator<Apartment> {

	@Override
	public int compare(Apartment o1, Apartment o2) {
		if (o1.getCostCurrency() == o2.getCostCurrency()) {
			return (int)(o1.getCostForNight() - o2.getCostForNight());
		} else {
			return (int)(o1.translateCostToSameCurrency() - o2.translateCostToSameCurrency());
		}
	}

}
