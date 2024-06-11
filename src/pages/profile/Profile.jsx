import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import usersService from '../../services/users.service';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link } from 'react-router-dom';
import labaService from '../../services/laba.service';
import pharmacistsService from '../../services/pharmacists.service';

const Profile = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    if(id){
      console.log(id);
      if(role=="Patient"){
        await patientsService.getpatient(id).then((data) => {
          console.log(data);
          setUser(data);
        })
      } else if(role=="Doctor") {
        await doctorsService.getDoctor(id).then((data) => {
          console.log(data);
          setUser(data);
        })
      } else if(role=="Lab Assistant") {
        await labaService.getLabAssistant(id).then((data) => {
          console.log(data);
          setUser(data);
        })
      } else if(role=="Pharmacist") {
        await pharmacistsService.getPharmacist(id).then((data) => {
          console.log(data);
          setUser(data);
        })
      }
    }
  }

  useEffect(() => {
    loadUser();

  }, [])

  return (
    <section>
    <div className="container border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center justify-start space-x-4 p-4">
          <Link to="/profile" className="p-2 bg-primary text-white font-[700] rounded-full hover:underline border border-solid border-color-secondary">
            Profile Summary
          </Link>
          <Link to="/profile/appointments" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Appointments
          </Link>
          {role&&(role==='Doctor'||role==='Patient')&&<Link to="/profile/records" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Medical History
          </Link>}
          {role&&(role==='Admin')&&<Link to="/profile/users" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            User Management
          </Link>}
          {/* {role&&role==='Doctor'&&<Link to="/profile/patients" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Patients
          </Link>} */}
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0">
          <img src={localStorage.getItem('avatar')} className="h-16 w-16 text-gray-600 rounded-full border border-solid border-color-gray" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-900">{username}</h1>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Description</h2>
        <p className="mt-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut bibendum mauris, vel fringilla libero.
          Integer in metus et justo ultricies accumsan. Vivamus tristique, nisl eu vehicula eleifend, ex nunc fermentum
          justo, eu imperdiet risus purus at elit.
        </p>
      </div>

      {user&&<div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Details / Information</h2>
        <ul className="mt-2 text-sm text-gray-600">
          <li>Full Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.contact}</li>
          {role&&role==='Doctor'&&<li>Specialization: {user.specialization}</li>}
        </ul>
      </div>}

      {user&&role=='Doctor'&&<div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>
        <div className="mt-2 text-sm text-gray-600">
          {user.qualifications&&user.qualifications.map((item) => <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {item}
          </span>)}
        </div>
      </div>}

      {/* <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>
        <div className="mt-2 text-sm text-gray-600">
          <p className="mb-1">Bachelor of Science in Computer Science</p>
          <p className="text-gray-500">University Name, Graduation Year</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
        <div className="mt-2 text-sm text-gray-600">
          <p className="mb-1">Software Developer</p>
          <p className="text-gray-500">Company Name, Start Year - End Year</p>
        </div>
      </div> */}
    </div>
    </section>
  );
};

export default Profile;
