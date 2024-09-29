import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineDownload, AiFillEye, AiOutlineFileText } from 'react-icons/ai';
import Notiflix from 'notiflix';
import documentsService from '../../services/documents.service';

const PatientDocuments = () => {
  const { patient } = useParams();
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [error, setError] = useState('');

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await documentsService.getDocumentsBySession(patient);
      setDocuments(data);
    } catch (error) {
      console.error("Error loading documents", error);
      Notiflix.Notify.failure('Failed to load documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [patient]);

  const handlePreview = (doc) => {
    if (!doc.file_path) {
      setError('Document URL is missing or invalid.');
      Notiflix.Notify.failure('Document URL is missing or invalid.');
      return;
    }

    const fileExtension = doc.file_path.split('.').pop().toLowerCase();
    if (fileExtension === 'pdf') {
      window.open(doc.file_path, '_blank');
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      setSelectedDoc(doc);
      setError('');
    } else {
      setError('Preview is not supported for this file type.');
      Notiflix.Notify.failure('Preview is not supported for this file type.');
    }
  };

  const closePreview = () => {
    setSelectedDoc(null);
    setError('');
  };

  if (loading) {
    return <div>Loading documents...</div>;
  }

  return (
    <section>
      <div className="container border border-gray-300 rounded-md shadow-md p-4">
        <div className="flex items-center justify-start space-x-4 p-4">
          <Link
            to="/profile"
            className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary"
          >
            Profile Summary
          </Link>
          <Link
            to="/profile/appointments"
            className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary"
          >
            My Appointments
          </Link>
          {role && (role === 'Doctor' || role === 'Patient') && (
            <Link
              to="/profile/records"
              className="text-blue-500 p-2 rounded-full hover:underline border border-solid border-color-secondary"
            >
              Medical History
            </Link>
          )}
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-shrink-0">
            <img
              src={localStorage.getItem('avatar')}
              className="h-16 w-16 text-gray-600 rounded-full border border-solid border-color-gray"
              aria-hidden="true"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-gray-900">{username}</h1>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Documents for Session {patient}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-white border rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <AiOutlineFileText className="text-blue-500 text-3xl" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <a
                      href={doc.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      download
                    >
                      <AiOutlineDownload className="text-2xl" />
                    </a>
                    <button
                      onClick={() => handlePreview(doc)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillEye className="text-2xl" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Keywords:</div>
                  <p className="text-sm text-gray-600">
                    {doc.keywords && doc.keywords.length > 0 ? doc.keywords.join(', ') : 'No keywords available'}
                  </p>
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Patient Info:</div>
                  <p className="text-sm text-gray-600">
                    {doc.patient_info || 'No patient info available'}
                  </p>
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Recommended Treatments:</div>
                  <ul className="text-sm text-gray-600">
                    {doc.recommendations && doc.recommendations.length > 0 ? (
                      doc.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx} className="mb-1">
                          {rec[0]}: {rec[1]}
                        </li>
                      ))
                    ) : (
                      <li>No recommendations available</li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No documents available for this session.</p>
          )}
        </div>

        {/* Preview Modal */}
        {selectedDoc && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closePreview}  // Click on background to close
          >
            <div
              className="relative bg-white rounded-lg shadow-lg p-4 w-2/3"
              onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside
            >
              <button
                onClick={closePreview}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                X
              </button>
              <img
                src={selectedDoc.url}
                alt={selectedDoc.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientDocuments;
