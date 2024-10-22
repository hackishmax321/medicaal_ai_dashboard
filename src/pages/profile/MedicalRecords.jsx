import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import doctorsService from '../../services/doctors.service';
import patientsService from '../../services/patients.service';
import { Link, useParams, useNavigate } from 'react-router-dom';
import appointmentsService from '../../services/appointments.service';
import Notiflix from 'notiflix';
import recordsService from '../../services/records.service';
import { AiFillEye, AiFillRedEnvelope,  AiOutlineAudio, AiOutlineFileText, AiFillWechat } from 'react-icons/ai'
import messagesService from '../../services/messages.service';

const MedicalRecords = () => {
    const { patient, session } = useParams();
    const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [user, setUser] = useState(null);
  const [appointments, setRecords] = useState([]);
  const [observation, setObservation] = useState('');
  const [renderedRecordIds, setRenderedRecordIds] = useState([]);

  const [prescriptions, setPrescriptions] = useState([]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

    const navigateToAudioRecords = () => {
        navigate(`/profile/medicalbook/${patient}/game`);
    };

    const navigateToDocuments = () => {
        navigate(`/profile/medicalbook/${session}/documents`);
    };

    const navigateToChat = () => {
        navigate(`/profile/medicalbook/${patient}/sessions`);
    };

    const handleSubmit = async () => {
      if (!newTitle || !newMessage) return;
    
      // Add the new message to the state
      const newMessageData = {
        title: newTitle,
        message: newMessage,
        sender: id, // Replace with actual sender ID
        receiver: patient, // Replace with actual receiver ID
      };
    
      console.log(newMessageData);
    
      try {
        // Sending message to the API and updating state
        await messagesService.createMessage(newMessageData).then(() => {
          setMessages([...messages, newMessageData]);
    
          // Show success notification
          Notiflix.Notify.success('Message sent successfully!');
        });
    
        // Clear the input fields
        setNewTitle("");
        setNewMessage("");
      } catch (error) {
        // Handle error and show error notification if needed
        Notiflix.Notify.failure('Failed to send message, please try again.');
        console.error("Error sending message:", error);
      }
    };

    const getMessagesByReceiver = async (patient) => {
      if(patient){
          await messagesService.getMessagesByReceiver(patient).then((data) => {
            setMessages(data)
          })
      }
      
    };

    const extractInstructions = (message) => {
      const instructionPattern = /!(.*?)!/g;
      const instructions = [...message.matchAll(instructionPattern)];
      return instructions.map((match) => match[1]); // Extract the instructions inside '!'
    };

  useEffect(() => {
      loadResources(id);
      getMessagesByReceiver(patient)
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
        <hr className="my-4 border-gray-300" />

        {/* Row of Icons (Audio Records, Documents) */}
        <div className="flex space-x-4 mb-6">
            {/* Card for Audio Records */}
            <div
                className="flex items-center p-4 w-[250px] h-[80px] bg-white border rounded-lg shadow-md cursor-pointer"
                onClick={navigateToChat}
            >
                {/* Icon */}
                <AiFillWechat className="text-blue-500 text-3xl" />
                {/* Text */}
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Chat Sessions</h3>
                </div>
            </div>
            <div
                className="flex items-center p-4 w-[250px] h-[80px] bg-white border rounded-lg shadow-md cursor-pointer"
                onClick={navigateToAudioRecords}
            >
                {/* Icon */}
                <AiFillRedEnvelope className="text-blue-500 text-3xl" />
                {/* Text */}
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Game Records</h3>
                </div>
            </div>

            {/* Card for Documents */}
            <div
                className="flex items-center p-4 w-[250px] h-[80px] bg-white border rounded-lg shadow-md cursor-pointer"
                onClick={navigateToDocuments}
            >
                {/* Icon */}
                <AiOutlineFileText className="text-blue-500 text-3xl" />
                {/* Text */}
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
                </div>
            </div>
        </div>
        <hr></hr>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Send a Message</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="mt-1 p-2 w-full border rounded-md"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <small>Provide instructions with '!' symbol and end with same symbol as well</small>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (!newTitle) return;

              handleSubmit()
            }}
          >
            Submit Message
          </button>
        </div>


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

        {messages.length > 0 && (
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Instructions</th>
              <th className="border p-2">Sender</th>
              <th className="border p-2">Receiver</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => {
              const instructions = extractInstructions(msg.message); // Extract instructions
              return (
                <tr key={index}>
                  <td className="border p-2">{new Date().toLocaleDateString()}</td>
                  <td className="border p-2">{msg.title}</td>
                  <td className="border p-2">{msg.message}</td>
                  <td className="border p-2">
                    {instructions.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ul>
                    ) : (
                      "No instructions"
                    )}
                  </td>
                  <td className="border p-2">{msg.sender}</td>
                  <td className="border p-2">{msg.receiver}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}    
      </div>

      

    </div>
    </section>
  );
};

export default MedicalRecords;
