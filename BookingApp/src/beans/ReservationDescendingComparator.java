package beans;

import java.util.Comparator;

public class ReservationDescendingComparator implements Comparator<Reservation> {

	@Override
	public int compare(Reservation o1, Reservation o2) {
		if (o1.getApartment().getCostCurrency() == o2.getApartment().getCostCurrency()) {
			return (int)(o1.getCost() - o2.getCost());
		} else {
			return (int)(o1.getApartment().translateCostToSameCurrency()*o1.getNumberOfNights() - o2.getApartment().translateCostToSameCurrency()*o2.getNumberOfNights());
		}
	}
}
