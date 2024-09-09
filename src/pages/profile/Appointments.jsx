import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link } from 'react-router-dom';
import appointmentsService from '../../services/appointments.service';
import Notiflix from 'notiflix';

const Appointments = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [name, setName] = useState(localStorage.getItem('name'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const handleRemoveAppointment = (id) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          await appointmentsService.deleteAppointment(id).then(() => {
            const updatedAppointments = appointments.filter((a) => a._id !== id);
            setAppointments(updatedAppointments);
            Notiflix.Report.success(
                'Success',
                "Appointment is canceled",
                'Okay',
            );
          });
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Notiflix.Notify.failure('An error occurred');
    }
  
  };

  const handleApproveAppointment = (id, appointment) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          appointment.accepted = true;
          await appointmentsService.updateAppointment(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, accepted: true } : a
            );
            setAppointments(updatedAppointments);
            Notiflix.Report.success(
                'Success',
                "Appointment is Approved",
                'Okay',
            );
          });
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Notiflix.Notify.failure('An error occurred');
    }
  };

  const handleCancelAppointment = (id, appointment) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          appointment.accepted = false;
          await appointmentsService.updateAppointment(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, accepted: false } : a
            );
            setAppointments(updatedAppointments);
            Notiflix.Report.success(
                'Success',
                "Appointment is Canceled",
                'Okay',
            );
      
          });
        }
      );
    } catch (error) {
      console.error('Error occurred:', error);
      Notiflix.Notify.failure('An error occurred');
    }
  };

  const loadUser = async () => {
    if(id){
      console.log(id);
      if(role=="Patient"){
        await patientsService.getpatient(id).then((data) => {
          console.log(data);
          setUser(data);
        })
      } else if(role=="Doctor") {
        await doctorsService.getDoctor(name).then((data) => {
          console.log(data);
          setUser(data);
        })
      }
    }
  }

  

  useEffect(() => {
    // loadUser();

  }, [])

  const loadResources = async () => {
    if(role==='Doctor'){
      await appointmentsService.getAppointmentsOfDoctor(name).then((data) => {
        console.log(data)  
        setAppointments(data);
      })
    } else if(role==='Patient')
    {
      await appointmentsService.getAppointmentsOfPatient(id).then((data) => {
        console.log(data)  
        setAppointments(data);
      })
    } else {
      await appointmentsService.getAppointments().then((data) => {
        console.log(data)  
        setAppointments(data);
      })
    }
      
  }

  useEffect(() => {
      loadResources();
  }, [])

  return (
    <section>
    <div className="container border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center justify-start space-x-4 p-4">
          <Link to="/profile" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Profile Summary
          </Link>
          <Link to="/profile/appointments" className="bg-primary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">
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
        <h2 className="text-lg font-semibold text-gray-900">About Appointments</h2>
        <p className="mt-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut bibendum mauris, vel fringilla libero.
          Integer in metus et justo ultricies accumsan. Vivamus tristique, nisl eu vehicula eleifend, ex nunc fermentum
          justo, eu imperdiet risus purus at elit.
        </p>

        <br></br>

                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border p-2">Patient Name</th>
                        <th className="border p-2">More Information</th>
                        <th className="border p-2">Date-Time</th>
                        <th className="border p-2">Status</th>
                        {(role==='Doctor'||role==='Patient')&&<th className="border p-2">Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.length>0&&appointments.map((appointment) => (
                        <tr key={appointment._id}>
                        <td className="border p-2">
                          <b>{appointment.userName}</b>
                          <br></br>
                          <Link to={'/profile/medicalbook/'+appointment.patient}><small>{appointment.patient}</small></Link>
                        </td>
                        <td className="border p-2">
                          {appointment.day} - {appointment.timeperiod}
                        </td>
                        <td className="border p-2">
                          <b>{appointment.timeperiod}</b>
                          <br></br>
                          <small>{(new Date(appointment.date)).toLocaleDateString()}</small>
                        </td>
                        <td className="border p-2">{appointment.accepted?'Approved':'Not Approved'}</td>
                        {(role==='Doctor'||role==='Patient')&&<td className="border p-2 flex items-center justify-center">
                            {appointment.accepted === false && (
                            <>
                                {role==='Doctor'&&<button
                                className="bg-green text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleApproveAppointment(appointment._id, appointment)}
                                >
                                Approve
                                </button>}
                                <button
                                className="bg-red text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveAppointment(appointment._id)}
                                >
                                Decline
                                </button>
                            </>
                            )}
                            {appointment.accepted === true && (
                            <>
                                <button
                                className="bg-shade text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleCancelAppointment(appointment._id, appointment)}
                                >
                                Cancel
                                </button>
                                <button
                                className="bg-red text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveAppointment(appointment._id)}
                                >
                                Remove
                                </button>
                            </>
                            )}
                        </td>}
                        </tr>
                    ))}
                    </tbody>
                </table>
      </div>
    </div>
    </section>
  );
};

export default Appointments;
