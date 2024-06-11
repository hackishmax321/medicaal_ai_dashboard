import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import patientsService from '../services/patients.service';
import doctorsService from '../services/doctors.service';
import pharmacistsService from '../services/pharmacists.service';
import labaService from '../services/laba.service';

const Signup = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleUserRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleAddQualification = (qualification) => {
    if (qualification && !qualifications.includes(qualification)) {
      setQualifications([...qualifications, qualification]);
    }
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };

  const handleSignUp = async () => {
    if (userRole !== '') {
      // if ((username !== null)) {
      //   Notiflix.Report.failure(
      //     'Registration Failed',
      //     'Username required for Registration',
      //     'Okay',
      //   );
      //   return;
      // }
      // if ((email !== '' || contactNumber !== null)) {
      //   Notiflix.Report.failure(
      //     'Registration Failed',
      //     'Email and Contact number required for Registration',
      //     'Okay',
      //   );
      //   return;
      // }
      // if (!(password === confirmPassword && (password !== '' || password !== null))) {
      //   Notiflix.Report.failure(
      //     'Registration Failed',
      //     'Password doesn\'t match with confirmation password',
      //     'Okay',
      //   );
      //   return;
      // }

      // Cloudinary Upload
      const formData = new FormData();
      formData.append('file', avatar);
      formData.append('upload_preset', 'gtnnidje'); 

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dkox7lwxe/image/upload', {
          method: 'POST',
          body: formData,
        });

        const cloudinaryData = await response.json();

        if (userRole === 'patient') {
          let obj = {
            username: username,
            fullName: name,
            gender: gender,
            email: email,
            contact: contactNumber,
            password: password,
            avatar: cloudinaryData.secure_url,
          };

          await patientsService.addpatient(obj).then(() => {
            Notiflix.Report.success(
              'Success',
              'Registration Successful as Patient',
              'Okay',
            );
            navigate('/');
          });
        } else if (userRole === 'doctor') {
          let obj = {
            username: username,
            name: name,
            gender: gender,
            email: email,
            contact: contactNumber,
            password: password,
            specialization: speciality,
            qualifications: qualifications,
            avatar: cloudinaryData.secure_url,
          };

          await doctorsService.addDoctor(obj).then(() => {
            Notiflix.Report.success(
              'Success',
              'Registration Successful as a Doctor',
              'Okay',
            );
            navigate('/');
          });
        } else if (userRole === 'labAssistant') {
          let obj = {
            username: username,
            name: name,
            gender: gender,
            email: email,
            contact: contactNumber,
            password: password,
            avatar: cloudinaryData.secure_url,
          };

          await labaService.addLabAssistant(obj).then(() => {
            Notiflix.Report.success(
              'Success',
              'Registration Successful as a Lab Assistant',
              'Okay',
            );
            navigate('/');
          });
        } else if (userRole === 'pharmacist') {
          let obj = {
            username: username,
            name: name,
            gender: gender,
            email: email,
            contact: contactNumber,
            password: password,
            documents: [],
            avatar: cloudinaryData.secure_url,
          };

          await pharmacistsService.addPharmacist(obj).then(() => {
            Notiflix.Report.success(
              'Success',
              'Registration Successful as a Pharmacist',
              'Okay',
            );
            navigate('/');
          });
        }
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        Notiflix.Notify.failure('Error uploading image. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          User Role
        </label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleUserRoleChange}
        >
          <option value="">Select User Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="labAssistant">Lab Assistant</option>
          <option value="pharmacist">Pharmacist</option>
        </select>
      </div>

      {/* Common Inputs */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gender
        </label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select your Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* ... Other common inputs ... */}

      {/* Role-specific Inputs */}
      {userRole === 'doctor' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Speciality
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />
        </div>
      )}

      {['doctor', 'pharmacist'].includes(userRole) && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Qualifications
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id='qualifi'
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Add Qualification"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddQualification(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => {
                const input = document.querySelector('#qualifi');
                if (input) {
                  handleAddQualification(input.value);
                  input.value = '';
                }
              }}
            >
              Add
            </button>
          </div>
          <div className="mt-2 space-x-2">
            {qualifications.map((qualification, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {qualification}
                <button
                  className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                  onClick={() => handleRemoveQualification(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ... Other role-specific inputs ... */}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contact Number
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Avatar (Upload)
        </label>
        <input
          type="file"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
