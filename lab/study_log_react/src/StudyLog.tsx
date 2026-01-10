import { useEffect, useState } from "react";
import "./StudyLog.css";
import supabase from "../utils/supabase";
import Loading from "./components/Loading";
import Button from "./components/atoms/Button";
import InputLabel from "./components/molecules/InputLabel";
import StudyLogItem from "./components/molecules/StudyLogItem";

type StudyRecord = {
  id?: number;
  title: string;
  hours: number;
};

function StudyLog() {
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyHours, setStudyHours] = useState(0);
  const [showFormError, setShowFormError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: studyLogs, error } = await supabase
        .from("study-logs")
        .select("*");

      if (error) throw error;
      setRecords(studyLogs);
      setLoading(false);
    }

    fetchData();
  }, [refreshKey]);

  const totalHours = records.reduce((sum, record) => sum + record.hours, 0);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTitle(e.target.value);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyHours(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const { error } = await supabase.from("study-logs").insert(newRecord);

    if (!error) {
      setRefreshKey(refreshKey + 1);
      setStudyTitle("");
      setStudyHours(0);
    }
  };

  const handleDeleteItem = async (id: number) => {
    console.log(id);
    const res = confirm("are you sure to delete the item?");

    if (!res) return;
    const response = await supabase.from("study-logs").delete().eq("id", id);
    
    console.log(response.error);
    
    if (!response.error) {
      setRefreshKey(refreshKey + 1);
    }
  };

  return (
    <>
      <div className="main">
        <div className="register_area">
          <form action="submit" onSubmit={handleSubmit}>
            <InputLabel
              label="Study Topic："
              name="studyTitle"
              id="studyTitle"
              placeholder="Enter What you studied"
              onChange={handleTitleChange}
              value={studyTitle}
            />

            <InputLabel
              label="Study Time(hours)："
              name="studyHours"
              id="studyHours"
              type="number"
              min={1}
              placeholder="0"
              onChange={handleHoursChange}
              value={studyHours}
            />

            <p>Current topic：{studyTitle}</p>
            <p>Current hours： {studyHours} 時間</p>

            <Button label="Add" type="submit" />
            {showFormError && <p>Please fill in all required fields.</p>}
          </form>
        </div>
        <div className="display_study_logs">
          <h1>✰Study Log✍︎ ꙳⋆</h1>
          {loading ? (
            <Loading />
          ) : (
            <>
              <p>合計時間：　{totalHours} / 1000 (H)</p>

              <ul className="study_logs">
                {records.map(({ id, title, hours }) => (
                  <StudyLogItem
                    key={id}
                    id={id}
                    title={title}
                    hours={hours}
                    deleteItem={handleDeleteItem}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default StudyLog;
