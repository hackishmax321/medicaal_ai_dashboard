import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import gameService from '../../services/game.service';

const GameRecords = () => {
  const { patient } = useParams();
  const [gameRecords, setGameRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGameRecords = async () => {
    setLoading(true);
    try {
      const data = await gameService.getGamesByUser(patient);
      setGameRecords(data);
    } catch (error) {
      console.error('Error loading game records', error);
      Notiflix.Notify.failure('Failed to load game records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGameRecords();
  }, [patient]);

  if (loading) {
    return <div>Loading game records...</div>;
  }

  return (
    <section>
      <div className="container border border-gray-300 rounded-md shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Game Records for {patient}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {gameRecords.length > 0 ? (
            gameRecords.map((record, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white border rounded-lg shadow-md"
              >
                {/* Progress circle showing score out of 30 */}
                <div className="w-16 h-16 mr-4">
                  <CircularProgressbar
                    value={(record.score / 40) * 100}
                    text={`${record.score}/40`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: `rgba(62, 152, 199, ${record.score / 40})`,
                      textColor: '#f88',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {record.name} - {new Date(record.date).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-600">Y Score: {record.yScore}</p>
                  <p className="text-sm text-gray-600">Result: {record.result || 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No game records available for this patient.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameRecords;
