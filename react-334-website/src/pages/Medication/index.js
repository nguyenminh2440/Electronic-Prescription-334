import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import SearchBar from "../../components/SearchBar";

import Title from "../../commom-ui/Title";
import Container from "../../commom-ui/Container";

import MedicalCard from "../../components/MedicalCard";

// hoc
import statusWrapper from "../../hoc/statusWrapper";

// api
import {
  apiUserMedicine,
  apiCreateUserMedication,
  apiDoctorMedicine,
} from "../../api";

import { UserInfoContext } from "../../context/userContext";
import PrescriptionTable from "../../components/PrescriptionTable";

import Button from "../../commom-ui/Button";
import Popup from "../../commom-ui/Popup";

import InputForm from "../../commom-ui/InputForm";

import { TextMatching } from "../../algo";

const CLASSES = ["name", "description"];
const HEADING = ["Name", "Description"];

const labels = {
  name: "Name",
  description: "Description",
};

const PROGRESS_STATUS = [
  '',
  'error',
  'success',
  'loading',
]

const Medication = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [medication, setMedication] = useState([]);
  const [progress, setProgress] = useState(0);
  const [add, setAdd] = useState(0);
  const [info, setInfo] = useState({});

  const [target, setTarget] = useState('');
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    console.log(value);

    const target = TextMatching("name", value, medication);
    if (target.length > 0) setTarget(target);
    else setTarget('');
  };

  const getMedication = async ({ token, id }) => {
    if (userInfo.role === "user") return await apiUserMedicine({ token });
    else if (userInfo.role === "doctor")
      return await apiDoctorMedicine({ token, id });
  };

  const fetchMedication = async () => {
    setProgress(3);
    const { result, message, data } = await getMedication({
      token: userInfo.token,
      id: userInfo.userId,
    });
    console.log(result, message, data);
    if (result !== "1" || !data) {
      setProgress(1);
    } else {
      setProgress(2);
      console.log(data.data.medicines);
      setMedication([...data.data.medicines]);
    }
    setInterval(() => setProgress(0), 1000);
  };

  useEffect(() => {
    fetchMedication();
  }, [userInfo.token]);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setInfo({ ...info, [id]: value });
  };

  const DefaultProps = (name) => ({
    id: name,
    label: labels[name],
    value: info[name],
    onChange: onInputChange,
  });

  const onCreateMedication = async () => {
    setProgress(3);
    const { result, data, message } = await apiCreateUserMedication({
      ...info,
      token: userInfo.token,
    });
    if (result === "1" && data) {
      setProgress(2);
      fetchMedication();
    } else {
      setProgress(1);
    }

    setInterval(() => setProgress(0), 1000);
  };

  return (
    <>
      <Helmet>
        <title>Medication</title>
      </Helmet>

      <Container>
        {progress !== 0 && <Popup type={PROGRESS_STATUS[progress]} />}
        <Title>Medications</Title>
        <SearchBar
          value={searchValue}
          onChange={(e) => onSearchChange(e)}
          placeholder="medication"
        />
        {target ? (
          <PrescriptionTable
            type="medication"
            classes={CLASSES}
            heading={HEADING}
            data={target}
          />
        ) : (
          <>
            {userInfo.role === "user" && (
              <Button type="primary" onClick={() => setAdd(1)}>
                Add
              </Button>
            )}

            {add === 1 ? (
              <MedicalCard drop={2} onClose={() => setAdd(0)}>
                <InputForm {...DefaultProps("name")} type="textArea" />
                <InputForm
                  {...DefaultProps("description")}
                  sz="big"
                  type="textArea"
                />
                <Button type="secondary" onClick={() => onCreateMedication()}>
                  Add
                </Button>
              </MedicalCard>
            ) : null}

            <PrescriptionTable
              type="medication"
              classes={CLASSES}
              heading={HEADING}
              data={medication}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default statusWrapper(Medication);
