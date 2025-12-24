import { useState } from "react";
import "./StudyLog.css";

type StudyRecord = {
  title: string;
  hours: number;
};

function StudyLog() {
  const initialRecords: StudyRecord[] = [
    { title: "勉強の記録1", hours: 1 },
    { title: "勉強の記録2", hours: 3 },
    { title: "勉強の記録3", hours: 5 },
  ];

  const [records, setRecords] = useState<StudyRecord[]>(initialRecords);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyHours, setStudyHours] = useState(0);
  const [showFormError, setShowFormError] = useState(false);

  const totalHours = records.reduce((sum, record) => sum + record.hours, 0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTitle(e.target.value);
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyHours(Number(e.target.value));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studyTitle || studyHours < 1) {
      setShowFormError(true);
      return;
    }

    if (showFormError) setShowFormError(false);

    const newRecord: StudyRecord = {
      title: studyTitle,
      hours: studyHours,
    };

    setRecords((prev) => [...prev, newRecord]);

    setStudyTitle("");
    setStudyHours(0);
  };

  return (
    <>
      <div className="main">
        <div className="register_area">
          <form action="submit" onSubmit={handleSubmit}>
            <div className="input_wrapper">
              <label htmlFor="studyTitle">Study Topic：</label>
              <input
                type="text"
                id="studyTitle"
                name="studyTitle"
                placeholder="Enter What you studied"
                value={studyTitle}
                onChange={handleTitleChange}
              />
            </div>

            <div className="input_wrapper">
              <label htmlFor="studyHours">Study Time(hours)：</label>
              <input
                type="number"
                id="studyHours"
                name="studyHours"
                min={1}
                placeholder="0"
                onChange={handleHoursChange}
                value={studyHours}
              />
            </div>

            <p>Current topic：{studyTitle}</p>
            <p>Current hours： {studyHours} 時間</p>

            <button type="submit">Add</button>
            {showFormError && <p>Please fill in all required fields.</p>}
          </form>
        </div>
        <div className="display_study_logs">
          <h1>✰Study Log✍︎ ꙳⋆</h1>
          <p>合計時間：　{totalHours} / 1000 (H)</p>

          <ul className="study_logs">
            {records.map((log, i) => (
              <li key={i}>
                <div>
                  <p>{log.title} ：</p>
                  <p>{log.hours} (H)</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default StudyLog;
