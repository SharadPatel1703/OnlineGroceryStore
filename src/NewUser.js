import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function NewUser() {
    const [formData, setFormData] = useState({
        'name': '',
        'email': '',
        'password': '',
        'address': '',
        'address2': '',
        'city': '',
        'state': '',
        'zip':''
    });
    // Setting function to change the state when user is entering details
    let handleChange = (e)=>{

        const {id,value} = e.target;
        setFormData((prevState)=>({
            ...prevState,
                [id]: value,

        }));
    };

    const navigate = useNavigate();
    // Below code will handle submitting when clicked in sign-in button
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/save-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    address: formData.address,
                    address2: formData.address2,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip
                }),
            });

            if (response.ok) {
                console.log('Data saved successfully!');
                console.log('Redirecting to the main page...');
                navigate('/Display')
            } else {
                console.error('Failed to save data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div>NewUser</div>
            <div className="container">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your Full Name" onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="address2" className="form-label">Address 2</label>
                        <input type="text" className="form-control" id="address2"
                               placeholder="Apartment, studio, or floor" onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" onChange={handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <select id="state" className="form-select" onChange={handleChange} value={formData.state}>
                            <option selected>Choose...</option>
                            <option>Alberta</option>
                            <option>British Columbia</option>
                            <option>Manitoba</option>
                            <option>New Brunswick</option>
                            <option>Newfoundland and Labrador</option>
                            <option>Nova Scotia</option>
                            <option>Ontario</option>
                            <option>Prince Edward Island</option>
                            <option>Quebec</option>
                            <option>Saskatchewan</option>
                            <option>North West Territories</option>
                            <option>Nunavut</option>
                            <option>Yukon</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default NewUser