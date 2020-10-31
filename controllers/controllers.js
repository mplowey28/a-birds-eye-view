const axios = require("axios").default;
require("dotenv").config();

const getImage = async (req, res, next) => {
	axios
		.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.location}&key=${process.env.GOOGLE_API}`
		)
		.then(res => res.data.results[0].geometry.location)
		.then(data => {
			return axios
				.get(
					`https://api.nasa.gov/planetary/earth/assets?lon=${data.lng}&lat=${data.lat}&&dim=0.10&api_key=${process.env.NASA_API}`
				)
				.then(response => res.json(response.data));
		})
		.catch(error => console.log(error));
};

module.exports.getImage = getImage;
