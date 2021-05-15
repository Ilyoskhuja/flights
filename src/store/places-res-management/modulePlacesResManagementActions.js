import axios from 'axios';
export default {
	
	fetchPlaces(context, city) {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`https://api.skypicker.com/locations?term=${city}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`
				)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
    measureDistance(context, data) {
		return new Promise((resolve, reject) => {
			axios
				.post(
					`https://localhost:5001/api/Flights/Measure`,data
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
