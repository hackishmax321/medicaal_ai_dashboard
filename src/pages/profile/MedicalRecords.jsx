import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link, useParams } from 'react-router-dom';
import appointmentsService from '../../services/appointments.service';
import Notiflix from 'notiflix';
import recordsService from '../../services/records.service';
import { AiFillEye, AiOutlineDownload } from 'react-icons/ai'

const MedicalRecords = () => {
    const { patient } = useParams();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState(null);
  const [appointments, setRecords] = useState([]);
  const [observation, setObservation] = useState('');
  const [renderedRecordIds, setRenderedRecordIds] = useState([]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [newMedication, setNewMedication] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const [labReport, setLabReport] = useState(null);



  const loadUser = async () => {
    if(patient){
        await patientsService.getpatient(patient).then((data) => {
            setUser(data);
        })
    }
  }

  const removePrescription = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setPrescriptions(updatedPrescriptions);
  };

  const handleLabReportUpload = async (id, appointment) => {
    if (labReport.length > 0) {
      const selectedFile = labReport[0];
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'gtnnidje'); 

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dkox7lwxe/image/upload', {
          method: 'POST',
          body: formData,
        });

        const cloudinaryData = await response.json();
        appointment.images.push({
          caption: 'Lab Report', 
          url: cloudinaryData.secure_url
        })
        await recordsService.updateRecord(id, appointment).then(() => {
          Notiflix.Report.success(
            'Success',
            'Lab Report is uploaded for '+ appointment._id + ' record',
            'Okay'
          );
        })

      }

      catch(error) {
        console.error('Error uploading image to Cloudinary:', error);
        Notiflix.Notify.failure('Error uploading image. Please try again.');
      }
    }
  }

  const handleUpdateRecord = (id, appointment) => {
    // Reset observation state
    setObservation(appointment.desc||'');

    // Show Notiflix input popup
    Notiflix.Confirm.prompt(
      'Update Record',
      'Enter Doctor\'s Observation:',
      appointment.desc||'Observation',
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


  const handleNewRecord = () => {
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
          // console.log("(user._id")
          // console.log(user._id)
          let obj = {
            user: user._id,
            userName: user.username,
            issuedBy: id,
            issuedByName: username,
            desc: inputValue,
            images: [],
            category: "Health",
            prescriptions: prescriptions,
            verified: false,
            served: false
          }
          await recordsService.addRecord(obj)
            .then(() => {
              // Update local state
              
              setRecords(records => [...records, obj]);

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
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          appointment.verified = appointment.verified?(!appointment.verified):true;
          await recordsService.updateRecord(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, verified: appointment.verified } : a
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
        'Are you sure you want to proceed?',
        'Yes',
        'No',
        async () => {
          appointment.served = appointment.served?(!appointment.served):true;;
          await recordsService.updateRecord(id, appointment).then(() => {
            const updatedAppointments = appointments.map((a) =>
              a._id === id ? { ...a, served: appointment.served } : a
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
    loadUser();
    await recordsService.getRecordsOfPatient(patient).then((data) => {
      setRecords([]);
      setRecords(data);
    })
      
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
          {role&&(role==='Doctor'||role==='Patient')&&<Link to="/profile/records" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            Medical History
          </Link>}
          {/* {role&&role==='Doctor'&&<Link to="/profile/patients" className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary">
            My Patients
          </Link>} */}
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
        {user&&<h2 className="text-lg font-semibold text-gray-900">About {user.username}</h2>}
        {user&&<div className="mb-6">
        <ul className="mt-2 text-sm text-gray-600">
          <li>Full Name: {user.fullName}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.contact}</li>
        </ul>
        <br></br>
        <hr></hr>
        
        {role&&role==='Doctor'&&<div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Prescriptions</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Medication</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Dosage</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={newDosage}
              onChange={(e) => setNewDosage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if(!newMedication||!newInstructions) return
              // Add new prescription to the state
              setPrescriptions([
                ...prescriptions,
                {
                  medication: newMedication,
                  dosage: newDosage,
                  instructions: newInstructions,
                },
              ]);

              // Clear the input fields
              setNewMedication('');
              setNewDosage('');
              setNewInstructions('');
            }}
          >
            Add Prescription
          </button>
          {prescriptions.length>0&&<button
            className="bg-purple text-white px-4 py-2 m-2 rounded"
            onClick={() => handleNewRecord()}
        >
            Create New Record
        </button>}
        </div>}

        <div className="mb-6">
          {prescriptions.length > 0 && (
            <div className="flex flex-wrap">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="bg-gray-100 border border-solid border-color-secondary p-2 mr-2 flex items-center rounded">
                  <p className="mr-2">
                    <b>{prescription.medication}</b> | {prescription.dosage} <br></br><small>{prescription.instructions}</small>
                  </p>
                  <button
                    className="bg-red text-white px-2 py-1 rounded"
                    onClick={() => removePrescription(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <hr></hr>
        
      </div>}
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
                    {appointments.length>0&&appointments.map((appointment) => {
                      // if (renderedRecordIds.includes(appointment._id)) {
                      //   console.log(appointment._id)
                      //   console.log(renderedRecordIds);
                      //   return null; // Skip rendering
                      // } else {
                      //   setRenderedRecordIds((prevIds) => [...prevIds, appointment._id]);
                      // }
                      // setRenderedRecordIds((prevIds) => [...prevIds, appointment._id]);

                      return (
                        <tr key={appointment._id}>
                        <td className="border p-2">
                          <b>{(new Date(appointment.createdAt)).toLocaleDateString()}</b>
                          <br></br>
                          <div className="flex flex-wrap">
                          {appointment.images&&appointment.images.length>0&&appointment.images.map((item, index) => <div key={index} className="bg-gray-100 border border-solid border-color-secondary p-2 mr-2 mb-2 flex items-center rounded">
                                  <p className="mr-2">
                                    < AiFillEye/><b>{item.caption}</b>
                                  </p>
                                  <a
                                    href={item.url} // Provide the URL of the file
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download // Add the download attribute to enable downloading
                                  >
                                    <AiOutlineDownload />
                                  </a>
                                  
                                </div>)}
                          </div>
                        </td>
                        {role&&role!=='Patient'&&<td className="border p-2">
                          <b>{appointment.userName}</b>
                          <br></br>
                          <small>{appointment.user}</small>
                        </td>}
                        <td className="border p-2">
                          <p>{appointment.desc}</p>
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
                          <div>
                          {role&&role==='Lab Assistant'&&<div className="mb-6">
                                <hr></hr>
                                <h2 className="text-lg font-semibold text-gray-900">Lab Report</h2>
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700">Upload Report as Elecctronic Copy</label>
                                  <input
                                    type="file"
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={(e) => setLabReport(e.target.files)}
                                  />
                                </div>
                                <button
                                  className="bg-purple text-white px-4 py-2 m-2 rounded"
                                  onClick={() => handleLabReportUpload(appointment._id, appointment)}
                                >
                                  Add Lab Report
                                </button>
                              </div>}
                          </div>
                        </td>
                        <td className="border p-2">
                          <b>{appointment.issuedByName}</b>
                          <br></br>
                          <small>{appointment.issuedBy}</small>
                        </td>
                        <td className="border p-2">{appointment.verified?'Verified':'Not Verified'}</td>
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
                                className="bg-orange text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleVerifyRecord(appointment._id, appointment)}
                                >
                                {appointment.verified?'Not Verify':'Verify'}
                                </button>
                            </>
                        </td>}
                        {role&&role==='Pharmacist'&&<td className="border p-2 flex items-center justify-center">
                            <>
                                <button
                                className="bg-orange text-white px-4 py-2 mr-2 rounded"
                                onClick={() => handleServedRecord(appointment._id, appointment)}
                                >
                                {appointment.served?'Not Served':'Served'}
                                </button>
                            </>
                        </td>}
                        </tr>
                    );})}
                    </tbody>
                </table>
      </div>

      

    </div>
    </section>
  );
};

export default MedicalRecords;
