import React, {useState, useEffect} from 'react';
import LineCard from './LineCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_STORAGE_LINES = 'lines-state';

const Home = () => {
  const [lines, setLines] = useState([{}, {}, {}, {}]);

  useEffect(() => {
    AsyncStorage.getItem(KEY_STORAGE_LINES).then((value) => {
      if (value) {
        setLines(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => AsyncStorage.setItem(KEY_STORAGE_LINES, JSON.stringify(lines)),
      200,
    );
    return () => clearTimeout(timeoutId);
  }, [lines]);

  const handleChangeDistance = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].distance = value;
      return updated;
    });
  };

  const handleChangeDescription = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].description = value;
      return updated;
    });
  };

  const handleChangeLandmark = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].landmark = value;
      return updated;
    });
  };

  const handleChangeLandmarkOrientation = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].landmarkOrientation = value;
      return updated;
    });
  };

  return lines.map((elt, index) => (
    <LineCard
      key={index}
      number={index + 1}
      distance={elt.distance}
      landmark={elt.landmark}
      landmarkOrientation={elt.landmarkOrientation}
      description={elt.description}
      onChangeDescription={(value) => handleChangeDescription(index, value)}
      onChangeDistance={(value) => handleChangeDistance(index, value)}
      onChangeLandmark={(value) => handleChangeLandmark(index, value)}
      onChangeLandmarkOrientation={(value) =>
        handleChangeLandmarkOrientation(index, value)
      }
    />
  ));
};

export default Home;
