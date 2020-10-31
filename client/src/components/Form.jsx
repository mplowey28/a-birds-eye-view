import React, { useState } from "react";
import "./Form.css";

function Form() {
	const [location, setLocation] = useState("");
	const [image, setImage] = useState("");
	const [show, toggleShow] = useState(true);

	const handleSubmit = async e => {
		e.preventDefault();
		await fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ location }),
		})
			.then(res => res.json())
			.then(res => setImage(res))
			.then(toggleShow(false))
			.then(setLocation(""));
	};

	const handleChange = e => {
		setLocation(e.target.value);
	};
	const handleClick = () => {
		toggleShow(true);
		setImage("");
	};
	return (
		<div className='wrapper'>
			<div className='image-wrapper'>
				<p className='image-date'>{image.date}</p>
				{image ? <img src={image.url} alt='Satellite img'></img> : ""}
			</div>
			{show ? (
				<div className='form-wrapper'>
					{/* <h2>World Viewer</h2> */}
					<form onSubmit={handleSubmit}>
						<div className='location-box'>
							<input
								type='text'
								name='location'
								value={location}
								id='location'
								placeholder='Please enter a location...'
								required
								onChange={e => handleChange(e)}
							/>
						</div>
						<button href='#'>Submit</button>
					</form>
				</div>
			) : (
				<button className='new-search-btn' onClick={handleClick}>
					{" "}
					New search
				</button>
			)}
		</div>
	);
}

export default Form;
