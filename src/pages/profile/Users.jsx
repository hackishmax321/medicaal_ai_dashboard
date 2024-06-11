import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link } from 'react-router-dom';
import appointmentsService from '../../services/appointments.service';
import Notiflix from 'notiflix';
import usersService from '../../services/users.service';
import labaService from '../../services/laba.service';
import pharmacistsService from '../../services/pharmacists.service';

const Users = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  
  const [users, setUsers] = useState([])
  const [current, setCurrent] = useState('Patients')

  const handleRemoveUser = (id) => {
    console.log(current)
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          if(current==="Patients") {
            await usersService.deleteUser(id).then(() => {
              const updatedUsers = users.filter((a) => a._id !== id);
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is deleted",
                  'Okay',
              );
            });
          } else if(current==="Doctors") {
            await doctorsService.deleteDoctor(id).then(() => {
              const updatedUsers = users.filter((a) => a._id !== id);
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is deleted",
                  'Okay',
              );
            });
          } else if(current==="Lab Assistants") {
            console.log("Right")
            await labaService.deleteLabAssistant(id).then(() => {
              const updatedUsers = users.filter((a) => a._id !== id);
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is deleted",
                  'Okay',
              );
            });
          } else if(current==="Pharmacists") {
            await pharmacistsService.deletePharmacist(id).then(() => {
              const updatedUsers = users.filter((a) => a._id !== id);
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is deleted",
                  'Okay',
              );
            });
          }
          
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Notiflix.Notify.failure('An error occurred');
    }
  
  };

  const handleBlockUser = (id, user) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          user.approved = !user.approved;
          if(current==="Patients") {
            await usersService.updateUser(id, user).then(() => {
              const updatedUsers = users.map((a) =>
                a._id === id ? { ...a, approved: user.approved } : a
              );
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is blocked",
                  'Okay',
              );
            });
          } else if(current==="Doctors") {
            await doctorsService.updateDoctor(id, user).then(() => {
              const updatedUsers = users.map((a) =>
                a._id === id ? { ...a, approved: user.approved } : a
              );
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is blocked",
                  'Okay',
              );
            });
          } else if(current==="Lab Assistants") {
            await labaService.updateLabAssistant(id, user).then(() => {
              const updatedUsers = users.map((a) =>
                a._id === id ? { ...a, approved: user.approved } : a
              );
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is blocked",
                  'Okay',
              );
            });
          } else if(current==="Pharmacists") {
            await pharmacistsService.updatePharmacist(id, user).then(() => {
              const updatedUsers = users.map((a) =>
                a._id === id ? { ...a, approved: user.approved } : a
              );
              setUsers(updatedUsers);
              Notiflix.Report.success(
                  'Success',
                  "User is blocked",
                  'Okay',
              );
            });
          }
          
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Notiflix.Notify.failure('An error occurred');
    }
  };

  const loadResources = async (r) => {
    setUsers([]);
    if(r==='Doctors'){
      await doctorsService.getDoctors().then((data) => {
        setUsers(data);
      })
    } else if(r==='Patients')
    {
      await patientsService.getPatients().then((data) => {
        setUsers(data);
      })
    } else if(r==='Lab Assistants') {
      await labaService.getLabAssistants().then((data) => {  
        setUsers(data);
      })
    } else if(r==='Pharmacists') {
      await pharmacistsService.getPharmacists().then((data) => {  
        setUsers(data);
      })
    }
      
  }

  useEffect(() => {
      loadResources(current);
  }, [])

  return (
    <section>
    <div className="container border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center justify-start space-x-4 p-4">
          <Link to="/profile" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Profile Summary
          </Link>
          <Link to="/profile/appointments" className="text-blue-500 font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Appointments
          </Link>
          {role&&(role==='Doctor'||role==='Patient')&&<Link to="/profile/records" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Medical History
          </Link>}
          {role&&(role==='Admin')&&<Link to="/profile/users" className="bg-primary text-white p-2 rounded-full hover:underline border border-solid border-color-secondary">
            User Management
          </Link>}
          {/* {role&&role==='Doctor'&&<Link to="/profile/patients" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Patients
          </Link>} */}
          {/* Add more buttons as needed */}
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0">
          {/* <UserCircleIcon className="h-16 w-16 text-gray-600" aria-hidden="true" /> */}
          <img src={localStorage.getItem('avatar')} className="h-16 w-16 text-gray-600 rounded-full border border-solid border-color-gray" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-900">{username}</h1>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">About User Management</h2>
        <p className="mt-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut bibendum mauris, vel fringilla libero.
          Integer in metus et justo ultricies accumsan. Vivamus tristique, nisl eu vehicula eleifend, ex nunc fermentum
          justo, eu imperdiet risus purus at elit.
        </p>

        <div className="flex items-center justify-start space-x-4 p-4">
          <button onClick={() => {if(current!=="Patients"){setCurrent("Patients"); loadResources("Patients")}}} className="bg-secondary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">Patients</button>
          <button onClick={() => {if(current!=="Doctors"){setCurrent("Doctors"); loadResources("Doctors")}}} className="bg-secondary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">Doctors</button>
          <button onClick={() => {if(current!=="Lab Assistants"){setCurrent("Lab Assistants"); loadResources("Lab Assistants")}}} className="bg-secondary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">Lab Assistants</button>
          <button onClick={() => {if(current!=="Pharmacists"){setCurrent("Pharmacists"); loadResources("Pharmacists")}}} className="bg-secondary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">Pharmacists</button>
        </div>

        <br></br>

                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Contact</th>
                        <th className="border p-2">Status</th>
                        {(role==='Doctor'||role==='Patient')&&<th className="border p-2">Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {users.length>0&&users.map((user) => (
                        <tr key={user._id}>
                        <td className="border p-2">
                          <b>{user.username}</b>
                          <br></br>
                          <Link to={'/profile/medicalbook/'+user.user}><small>{user._id}</small></Link>
                        </td>
                        <td className="border p-2">
                          {user.fullName}
                        </td>
                        <td className="border p-2">
                          {user.email}
                        </td>
                        <td className="border p-2">
                          {user.contact}
                        </td>
                        <td className="border p-2">{user.approved?'Approved':'Not Approved'}</td>
                        
                            {user.approved === false && (
                            <>
                                <button
                                className="bg-green text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleBlockUser(user._id, user)}
                                >
                                Approve
                                </button>
                                <button
                                className="bg-red text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveUser(user._id)}
                                >
                                Remove
                                </button>
                            </>
                            )}
                            {user.approved === true && (
                            <>
                                <button
                                className="bg-orange text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleBlockUser(user._id, user)}
                                >
                                Block
                                </button>
                                <button
                                className="bg-red text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveUser(user._id)}
                                >
                                Remove
                                </button>
                            </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
      </div>
    </div>
    </section>
  );
};

export default Users;
