import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appointmentsService from '../services/appointments.service';
import Notiflix from 'notiflix';

const AppointmentForm = () => {
    const navigate = useNavigate();
    const { id, name } = useParams();
    const [user, setUser] = useState(localStorage.getItem('username'));
    const [userid, setUserID] = useState(localStorage.getItem('id'));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    setUploadedDocuments(Array.from(files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let obj = {
        user: userid,
        userName: user,
        doctor: id,
        doctorName: name,
        desc: additionalInfo,
        images: uploadedDocuments,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        verified: false
    };

    await appointmentsService.addAppointment(obj).then(() => {
        Notiflix.Report.success(
            'Success',
            "Your appointment is placed",
            'Okay',
        );
        navigate('/profile');
    })
    
  };

  return (
    <section>
        <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">{`Make an Appointment with ${name}`}</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Date
                    </label>
                    <div className="mt-2">
                        <input
                        type="date"
                        name="date"
                        id="date"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={selectedDate}
                        onChange={handleDateChange}
                        required
                        />
                    </div>
                    </div>

                    <div className="sm:col-span-2">
                    <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Time
                    </label>
                    <div className="mt-2">
                        <input
                        type="time"
                        name="time"
                        id="time"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        required
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="additional-info" className="block text-sm font-medium leading-6 text-gray-900">
                        Additional Information
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="additional-info"
                        name="additional-info"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={additionalInfo}
                        onChange={handleInfoChange}
                        />
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="upload-documents" className="block text-sm font-medium leading-6 text-gray-900">
                        Upload Documents
                    </label>
                    <div className="mt-2">
                        <input
                        type="file"
                        id="upload-documents"
                        name="upload-documents"
                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleFileUpload}
                        multiple
                        />
                        <p className="text-xs leading-5 text-gray-600">Upload PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
                </button>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Make Appointment
                </button>
            </div>
            </form>
        </div>
    </section>
  );
};

export default AppointmentForm;
