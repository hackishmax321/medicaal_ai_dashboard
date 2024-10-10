import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import chatSessionsService from '../../services/chatSessions.service';

const ChatSessions = () => {
  const { patient } = useParams();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(patient)

  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await chatSessionsService.getSessionsByName(patient);
      setSessions(data);
    } catch (error) {
      console.error("Error loading chat sessions", error);
      Notiflix.Notify.failure('Failed to load chat sessions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [patient]);

  if (loading) {
    return <div>Loading chat sessions...</div>;
  }

  return (
    <section>
      <div className="container border border-gray-300 rounded-md shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Chat Sessions for {patient}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-white border rounded-lg shadow-md"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Session on {new Date(session.date).toLocaleDateString()}</h3>
                  <p className="text-sm text-gray-600">Rating: {session.rate}/5</p>
                  <p className="text-sm text-gray-600">Condition: {session.condition}</p>
                </div>

                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Interference Score:</div>
                  <p className="text-sm text-gray-600">{session.interference_score}</p>
                </div>

                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Control Score:</div>
                  <p className="text-sm text-gray-600">{session.control_score}</p>
                </div>

                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Answers:</div>
                  <ul className="text-sm text-gray-600">
                    {session.answers && session.answers.length > 0 ? (
                      session.answers.slice(0, 5).map((answer, idx) => (
                        <li key={idx} className="mb-1">
                          {answer}
                        </li>
                      ))
                    ) : (
                      <li>No answers available</li>
                    )}
                  </ul>
                </div>

                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700">Polarity Scores:</div>
                  <ul className="text-sm text-gray-600">
                    {session.polarity_scores && session.polarity_scores.length > 0 ? (
                      session.polarity_scores.slice(0, 5).map((score, idx) => (
                        <li key={idx} className="mb-1">
                          {`Score ${idx + 1}: ${score}`}
                        </li>
                      ))
                    ) : (
                      <li>No polarity scores available</li>
                    )}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No chat sessions available for this patient.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatSessions;
