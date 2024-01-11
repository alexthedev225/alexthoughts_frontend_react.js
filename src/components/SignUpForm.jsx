import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../config/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('email', formData.email);
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('password', formData.password);
    formDataWithImage.append('image', image);

    try {
      const response = await axios.post(`${apiUrl}/api/users/signup`, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres actions nécessaires
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>Profile Image:
          <input type="file" accept="image/*" onChange={handleImageChange} multiple/>
        </label>
        <button type="submit">S&apos;inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
