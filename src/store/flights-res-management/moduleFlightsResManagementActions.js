import axios from 'axios';
export default {
	
	fetchFlights(context, data) {
		return new Promise((resolve, reject) => {
			axios
				.get(

					` https://api.skypicker.com/aggregation_flights?fly_from=${data.from}&fly_to=${data.to}&v=3&date_from=${data.depart}&date_to=${data.return}&max_fly_duration=6&flight_type=oneway&one_for_city=0&one_per_date=1&adults=${data.passenger}&children=0&infants=0&partner=test222fasttest&partner_market=us&curr=EUR&locale=en&limit=30&sort=price&asc=1&xml=0`
				)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

};
