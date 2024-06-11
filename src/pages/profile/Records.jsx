import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link } from 'react-router-dom';
import appointmentsService from '../../services/appointments.service';
import Notiflix from 'notiflix';
import recordsService from '../../services/records.service';

const Records = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState(null);
  const [appointments, setRecords] = useState([]);
  const [observation, setObservation] = useState('');

  const handleUpdateRecord = (id, appointment) => {
    // Reset observation state
    setObservation('');

    // Show Notiflix input popup
    Notiflix.Confirm.prompt(
      'Update Record',
      'Enter Doctor\'s Observation:',
      'Your Observation',
      'Submit',
      'Cancel',
      async (inputValue) => {
        // Handle submission
        if (inputValue) {
          appointment.desc = inputValue;
          await recordsService.updateRecord(id, appointment)
            .then(() => {
              // Update local state
              const updatedRecords = appointments.map((a) =>
                a._id === id ? { ...a, desc: inputValue } : a
              );
              setRecords(updatedRecords);

              // Show success notification
              Notiflix.Report.success(
                'Success',
                'Record is updated. Your answer was '+ inputValue,
                'Okay'
              );
            })
            .catch((error) => {
              console.error('Error occurred:', error);
              Notiflix.Notify.failure('An error occurred');
            });
        }
      }
    );
  };


  const handleRemoveRecords = (id) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to delete this medical record?',
        'Yes',
        'No',
        async () => {
          await recordsService.deleteRecord(id).then(() => {
            const updatedAppointments = appointments.filter((a) => a._id !== id);
            setRecords(updatedAppointments);
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

  const handleVerifyRecord = (id, appointment) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to verify?',
        'Yes',
        'No',
        async () => {
          appointment.verified = true;
          await recordsService.updateRecord(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, verified: true } : a
            );
            setRecords(updatedAppointments);
            Notiflix.Report.success(
                'Success',
                "Medical Record is verified",
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

  const handleServedRecord = (id, appointment) => {
    try{
      Notiflix.Confirm.show(
        'Confirmation',
        'Are you sure you want to verify?',
        'Yes',
        'No',
        async () => {
          appointment.served = true;
          await recordsService.updateRecord(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, served: true } : a
            );
            setRecords(updatedAppointments);
            Notiflix.Report.success(
                'Success',
                "Medical Record is verified",
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


  const loadResources = async (id) => {
    if(role==='Patient') {
      await recordsService.getRecordsOfPatient(id).then((data) => {
        console.log(data)  
        setRecords(data);
      })
    } if(role==='Doctor') {
      await recordsService.getRecordsOfDoctor(id).then((data) => {
        console.log(data)  
        setRecords(data);
      })
    }
      
  }

  useEffect(() => {
      loadResources(id);
  }, [])

  return (
    <section>
    <div className="container border border-gray-300 rounded-md shadow-md">
      <div className="flex items-center justify-start space-x-4 p-4">
          <Link to="/profile" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Profile Summary
          </Link>
          <Link to="/profile/appointments" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Appointments
          </Link>
          <Link to="/profile/records" className="bg-primary text-white font-[700] p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Medical History
          </Link>
          {/* {role&&role==='Doctor'&&<Link to="/profile/patients" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Patients
          </Link>} */}
      </div>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0">
        <img src={localStorage.getItem('avatar')} className="h-16 w-16 text-gray-600 rounded-full border border-solid border-color-gray" aria-hidden="true" />
          {/* <UserCircleIcon className="h-16 w-16 text-gray-600" aria-hidden="true" /> */}
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-900">{username}</h1>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">About Previous Patients</h2>
        <p className="mt-2 text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut bibendum mauris, vel fringilla libero.
          Integer in metus et justo ultricies accumsan. Vivamus tristique, nisl eu vehicula eleifend, ex nunc fermentum
          justo, eu imperdiet risus purus at elit.
        </p>

        <br></br>

                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border p-2">Date</th>
                        {role&&role!=='Patient'&&<th className="border p-2">Patient</th>}
                        <th className="border p-2">Doctor's Observation / More Information</th>
                        <th className="border p-2">Issued By</th>
                        <th className="border p-2">Verified by Lab</th>
                        <th className="border p-2">Medicines</th>
                        {role&&role!=='Patient'&&<th className="border p-2">Actions</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.length>0&&appointments.map((appointment) => (
                        <tr key={appointment._id}>
                        <td className="border p-2">
                          <b>{(new Date(appointment.createdAt)).toLocaleDateString()}</b>
                        </td>
                        {role&&role!=='Patient'&&<td className="border p-2">
                          <b>{appointment.userName}</b>
                          <br></br>
                          <Link to={'/profile/medicalbook/'+appointment.user}><small>{appointment.user}</small></Link>
                        </td>}
                        <td className="border p-2">
                          {appointment.desc}
                          <br></br>
                          <div className="flex flex-wrap">
                              {appointment.prescriptions&&appointment.prescriptions.length>0&&appointment.prescriptions.map((prescription, index) => (
                                <div key={index} className="bg-gray-100 border border-solid border-color-secondary p-2 mr-2 mb-2 flex items-center rounded">
                                  <p className="mr-2">
                                    <b>{prescription.medication}</b> | {prescription.dosage} <br></br><small>{prescription.instructions}</small>
                                  </p>
                                  
                                </div>
                              ))}
                          </div>
                        </td>
                        <td className="border p-2">
                          <b>{appointment.issuedByName}</b>
                          <br></br>
                          <small>{appointment.issuedBy}</small>
                        </td>
                        <td className="border p-2">{appointment.verified?'Approved':'Not Approved'}</td>
                        <td className="border p-2">{appointment.served?'Served':'Not Served'}</td>
                        {role&&role==='Doctor'&&<td className="border p-2 flex items-center justify-center">
                            <>
                                <button
                                className="bg-green text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleUpdateRecord(appointment._id, appointment)}
                                >
                                Update
                                </button>
                                <button
                                className="bg-red text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveRecords(appointment._id)}
                                >
                                Remove
                                </button>
                            </>
                        </td>}
                        {role&&role==='Lab Assistant'&&<td className="border p-2 flex items-center justify-center">
                            <>
                                <button
                                className="bg-green text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleVerifyRecord(appointment._id, appointment)}
                                >
                                Verify
                                </button>
                            </>
                        </td>}
                        {role&&role==='Pharmacist'&&<td className="border p-2 flex items-center justify-center">
                            <>
                                <button
                                className="bg-green text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleServedRecord(appointment._id, appointment)}
                                >
                                Served
                                </button>
                            </>
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

export default Records;
